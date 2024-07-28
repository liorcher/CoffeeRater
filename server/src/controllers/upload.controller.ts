import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.status(200).send({ filename: req.file.filename, path: req.file.path });
};

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
