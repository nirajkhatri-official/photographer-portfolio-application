import bcrypt from "bcrypt";
import { UserModel } from "../config/db.js";
import dotenv from "dotenv";
import {
  generateAccessToken,
  generateRefreshToken,
  validateAccessToken,
} from "../utils/jwtUtils.js";
import { transporter } from "../utils/sendMail.js";

dotenv.config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).send({
        error: true,
        form_error: {
          email: "User doesn't exist",
        },
      });
    }

    const isSame = await bcrypt.compare(password, user.password);

    if (!isSame) {
      return res.status(400).send({
        error: true,
        form_error: {
          password: "Password doesnot matched",
        },
      });
    }

    let accessToken = generateAccessToken(user?.id);
    let refreshToken = generateRefreshToken(user?.id);

    res.cookie("access-token", accessToken, {
      httpOnly: true,
    });
    res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
    });

    return res.status(201).send({
      success: true,
      message: "Login Successfull",
      user: {
        id: user?.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        error: true,
        form_error: { email: "Email is already registered" },
      });
    }

    const data = {
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
    };

    const user = await UserModel.create(data);

    const userResponse = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    return res.status(201).send({
      success: true,
      message: "User created successfully",
      data: userResponse,
    });
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("access-token", {
      httpOnly: true,
    });

    res.clearCookie("refresh-token", {
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await UserModel.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(400).send({
      error: true,
      form_error: {
        email: "User doesn't exist",
      },
    });
  }

  const token = generateAccessToken(user?.id);

  await transporter.sendMail({
    from: process.env.MAIL_FROM_EMAIL,
    to: email,
    subject: "Reset Password",
    text: `Click to reset your password ${process.env.FRONT_END_URL}/reset-password/${token}`,
    html: `<p>Click <a href="${process.env.FRONT_END_URL}/reset-password/${token}">here</a> to reset your password.</p>`,
  });
  return res.status(200).send({
    message: "Password reset link send successfully",
  });
};

const resetPassword = async (req, res) => {
  try {
    const { password, token } = req.body;

    if (!password) {
      return res.status(400).send({
        error: true,
        message: "Please provide password",
      });
    }
    const decode = validateAccessToken(token);

    const user = await UserModel.findOne({
      where: {
        id: decode?.id,
      },
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export { signup, login, logoutUser, forgetPassword, resetPassword };
