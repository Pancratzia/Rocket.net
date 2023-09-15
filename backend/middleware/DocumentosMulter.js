const multer = require('multer');
const { extname, join } = require('path');

const CURRENT_DIR = __dirname;
const MIMETYPES = ['application/pdf', 'application/msword', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint'];

const CargaDocumento = multer({
  storage: multer.diskStorage({
    destination: join(CURRENT_DIR, '../cargas'),
    filename: (req, file, cb) => {
      const extDocumento = extname(file.originalname);
      const nombreDocumento = file.originalname.split(extDocumento)[0]
        .split(extDocumento)[0]
        .replace(/\s+/g, '_')
        .toLowerCase();

      cb(null, `${nombreDocumento}-${Date.now()}-${extDocumento}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) cb(null, true);
    else {
      cb(new Error('Formato del archivo no permitido'), false);
    }
  },
  limits: {
    fieldSize: 10000000
  }
});
    
module.exports = {CargaDocumento, CURRENT_DIR};
