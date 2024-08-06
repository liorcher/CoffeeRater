import { Request, Response } from "express";
import fs from "fs";
import path from "path";

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image
 *     description: Uploads an image to the server.
 *     tags: [Image]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully uploaded image.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 filename:
 *                   type: string
 *                 path:
 *                   type: string
 *       400:
 *         description: No file uploaded.
 */
export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res
    .status(200)
    .send({
      filename: req.file.filename,
      path: `http://localhost:9000/api/v1/images/${req.file.filename}`,
    });
};

/**
 * @swagger
 * /images/{filename}:
 *   get:
 *     summary: Get an image
 *     description: Retrieves an image by its filename.
 *     tags: [Image]
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the image file to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved image.
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Image not found.
 */
export const getImage = async (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../..", "uploads", filename);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send("Image not found.");
    }

    res.sendFile(filePath);
  });
};
