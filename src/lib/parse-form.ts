import type { NextApiRequest } from "next";
import formidable from "formidable";
import fs from "fs/promises";

export interface ParsedFile {
  buffer: Buffer;
  mimeType: string;
  fileName: string;
  size: number;
}

/**
 * Parses multipart/form-data and extracts the uploaded file.
 *
 * @param req - Next.js request
 * @returns The uploaded file as a Buffer
 */
export async function parseFormFile(req: NextApiRequest): Promise<ParsedFile> {
  const form = formidable({
    maxFileSize: 10 * 1024 * 1024,
    keepExtensions: true,
  });

  const [, files] = await form.parse(req);

  const fileArray = files.image;
  if (!fileArray || fileArray.length === 0) {
    throw new Error('No image file provided. Use field name "image"');
  }

  const file = fileArray[0];

  const mimeType = file.mimetype || "";
  if (!mimeType.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }
  const buffer = await fs.readFile(file.filepath);

  await fs.unlink(file.filepath).catch(() => {});

  return {
    buffer,
    mimeType,
    fileName: file.originalFilename || "design.jpg",
    size: file.size,
  };
}
