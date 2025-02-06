import express from "express";
import { validateToken } from "../middlewares/authMiddleware.js";
import {
  createAlbum,
  deleteAlbumById,
  getAlbumById,
  getAlbumByUserId,
  getAllAlbums,
  updateAlbum,
} from "../controllers/albumController.js";

const router = express.Router();

import multer from "multer";
const upload = multer({ dest: "uploads/" });

router.get("/albums", validateToken, getAllAlbums);
router.get("/albums/:id", validateToken, getAlbumById);
router.get("/my-albums/:id", validateToken, getAlbumByUserId);
router.delete("/albums/:id", validateToken, deleteAlbumById);
router.put(
  "/albums/:id",
  validateToken,
  upload.array("photos", 20),
  updateAlbum
);

router.post("/albums", validateToken, upload.array("photos", 20), createAlbum);

export default router;
