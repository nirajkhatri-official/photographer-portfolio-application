import { AlbumModel } from "../config/db.js";
import fs from "fs";
import { validateAccessToken } from "../utils/jwtUtils.js";

export const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params;

    const album = await AlbumModel.findOne({
      where: { id },
    });

    if (!album) {
      return res.status(404).json({
        error: true,
        message: "Album not found",
      });
    }

    return res.status(200).send({
      success: true,
      data: album,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const getAlbumByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    const album = await AlbumModel.findAll({
      where: { userId: id },
    });

    if (!album) {
      return res.status(404).json({
        error: true,
        message: "Album not found",
      });
    }

    return res.status(200).send({
      success: true,
      data: album,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const deleteAlbumById = async (req, res) => {
  try {
    const { id } = req.params;

    const album = await AlbumModel.findOne({ where: { id } });

    if (!album) {
      return res.status(404).send({
        success: false,
        message: "Album not found",
      });
    }

    await AlbumModel.destroy({ where: { id } });

    album?.photos.forEach((photo) => {
      const filePath = photo;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    return res.status(200).send({
      success: true,
      message: "Album deleted successfully",
      id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const getAllAlbums = async (req, res) => {
  try {
    const allAlbums = await AlbumModel.findAll();

    return res.status(200).send({
      success: true,
      data: allAlbums,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const getMyAlbums = async (req, res) => {
  try {
    const userId = req.userId;
    const allAlbums = await AlbumModel.findAll({
      where: { userId },
    });

    return res.status(200).send({
      success: true,
      data: allAlbums,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

export const createAlbum = async (req, res) => {
  try {
    if (!req.files || req.files.length == 0) {
      return res.status(400).send({
        error: "No files uploaded",
      });
    }

    const filePaths = req.files?.map((file) => file?.path);

    const newAlbum = await AlbumModel.create({
      title: req.body?.title,
      category: req.body?.category,
      description: req.body?.description || null,
      photos: filePaths,
      userId: req?.userId,
    });

    return res.status(201).send({
      success: true,
      message: "Album Created Successfully",
      data: newAlbum,
    });
  } catch (error) {
    return res.status(500).send({
      error: error,
    });
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, category, description, existingPhotos = [] } = req.body;

    const album = await AlbumModel.findByPk(id);
    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }

    const finalizedExistingPhotos = Array.isArray(existingPhotos)
      ? [...existingPhotos]
      : [existingPhotos];

    const deletedPhotos = album?.photos?.filter(
      (photo) => !finalizedExistingPhotos?.includes(photo)
    );

    deletedPhotos.forEach((photo) => {
      const filePath = photo;
      console.log(filePath, "path");

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    const uploadedPhotos = req.files ? req.files.map((file) => file.path) : [];

    const updatedPhotos = [...finalizedExistingPhotos, ...uploadedPhotos];

    album.title = title || album.title;
    album.category = category || album.category;
    album.description = description || album.description;
    album.photos = updatedPhotos;

    await album.save();

    return res.status(200).json({
      success: true,
      message: "Album Updated Successfully",
      data: album,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};
