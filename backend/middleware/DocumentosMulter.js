const multer = require('multer');
const { extname, join } = require('path');

const CURRENT_DIR = __dirname;
const MIMETYPES = ['application/pdf',          // PDF
'application/msword',       // Doc
'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Docx
'application/vnd.ms-powerpoint', // PPT
'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PPTX
'application/vnd.ms-excel', // XLS
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX 
];

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
