import type { NextApiRequest } from "next";
import formidable from "formidable";
import fs from "fs/promises";

export interface ParsedFile {
  buffer: Buffer;
  mimeType: string;
  fileName: string;
  size: number;
}

export interface ParsedForm {
  file: ParsedFile;
  fields: {
    name?: string;
    [key: string]: string | undefined;
  };
}

/**
 * Parses multipart/form-data and extracts the uploaded file AND form fields.
 *
 * @param req - Next.js request
 * @returns The uploaded file as a Buffer plus any extra fields
 */
export async function parseFormFile(req: NextApiRequest): Promise<ParsedForm> {
  const form = formidable({
    maxFileSize: 10 * 1024 * 1024,
    keepExtensions: true,
  });

  const [fields, files] = await form.parse(req);

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

  // ─── Extract Fields ───
  // formidable returns fields as arrays, we take the first value
  const parsedFields: ParsedForm["fields"] = {};

  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value) && value.length > 0) {
      parsedFields[key] = value[0];
    }
  }

  return {
    file: {
      buffer,
      mimeType,
      fileName: file.originalFilename || "design.jpg",
      size: file.size,
    },
    fields: parsedFields,
  };
}
