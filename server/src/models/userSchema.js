import { DataTypes } from "sequelize";

export const createUserModel = async (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password cannot be empty",
        },
        len: {
          args: [6, Infinity],
          msg: "Password must be of at least six digits.",
        },
      },
    },
  });
  return User;
};
