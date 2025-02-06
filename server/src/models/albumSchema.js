import { DataTypes } from "sequelize";
import { UserModel } from "../config/db.js";

export const createAlbumModel = async (sequelize) => {
  const Album = sequelize.define("Album", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
  });
  return Album;
};
