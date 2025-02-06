import PGSequelizer from "sequelize";
import dotenv from "dotenv";
import { createUserModel } from "../models/userSchema.js";
import { createAlbumModel } from "../models/albumSchema.js";

dotenv.config();

const { Sequelize } = PGSequelizer;

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

let UserModel = null;
let AlbumModel = null;

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    UserModel = await createUserModel(sequelize);
    AlbumModel = await createAlbumModel(sequelize);

    UserModel.hasMany(AlbumModel, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    AlbumModel.belongsTo(UserModel, {
      foreignKey: "userId",
    });
    await sequelize.sync({
      alter: true,
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { connection, UserModel, AlbumModel };
