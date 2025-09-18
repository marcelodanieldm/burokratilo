// backend/middleware/upload.js

const multer = require('multer');
const path = require('path');
require('dotenv').config();

// Configurar almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOAD_PATH || './uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtrar tipos de archivo
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten PDF y JPG'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB máximo
});

module.exports = upload;