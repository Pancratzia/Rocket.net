const multer = require('multer');
const { extname, join } = require('path');

const CURRENT_DIR = __dirname;
const MIMETYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const CargaArchivo = multer({
  storage: multer.diskStorage({
    destination: join(CURRENT_DIR, '../cargas'),
    filename: (req, file, cb) => {
      const extArchivo = extname(file.originalname);
      const nombreArchivo = file.originalname.split(extArchivo)[0]
        .split(extArchivo)[0]
        .replace(/\s+/g, '_')
        .toLowerCase();

      cb(null, `${nombreArchivo}-${Date.now()}-${extArchivo}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) cb(null, true);
    else {
      cb(new Error('Tipo de archivo no permitido'), false);
    }
  },
  limits: {
    fieldSize: 10000000
  }
});

module.exports = {CargaArchivo};
