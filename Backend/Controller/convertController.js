import { convertToCanvasCode } from '../utils/converter.js';
import fs from 'fs';
import path from 'path';

export const converts = async (req, res) => {
  try {

    if (!req.file || !req.file.path) {
      return res.status(400).json({success: false,message: 'No file uploaded. Please select a valid file.',});
    }

    const filePath = req.file.path;
    const mimeType = req.file.mimetype;

    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (!allowedTypes.includes(mimeType)) {
      return res.status(400).json({success: false,message: `Only PNG, JPEG, or PDF are allowed.`,});
    }

    const code = await convertToCanvasCode(filePath, mimeType);

    return res.status(200).json({success: true,code,});

  } catch (error) {
    console.error('Conversion error:', error);
    return res.status(500).json({success: false,message: 'Internal Server Error.',error: error.message,});
  }
};