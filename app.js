const express = require('express');
const multer = require('multer');
const path = require('path');
const ejs = require('ejs');
const app = express();

//Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        //1st param is error. As we don't want error so give that null.
        //2nd is name which can be anything. So here, fieldname is myImage 
        //as the name given in ejs file and then a timestamp then extension in original filename
    }
});

//Init upload
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 3 //if exceeded it automatically handles by giving err on upload() calling point
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
}).single('myImage'); //to upload single file and that file input has name field as myImage in index.ejs

function checkFileType(file, cb) {
    //Allowed types
    const fileTypes = /jpeg|jpg|png|gif/;
    //check ext
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype); //mimetype for images is image/jpeg or image/jpg etc.
    if (extName && mimetype) {
        return cb(null, true); //error : null and accept file : true
    } else {
        cb('Error: Images Only!'); //this is catched on upload(req,res,(err)=>{}) here in err.
    }
}

//EJS
app.set('view engine', 'ejs'); //always looks up in views folder no need to set views
//STatic Public folder for css and other stuff
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                //no file selected
                res.render('index', {
                    msg: 'Error: No File Selected'
                });
            } else {
                res.render('index', {
                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}` //filename is the latest file uploaded in uploads folder
                });
            }
        }
    });
});

const port = 3000;
app.listen(port, () => console.log(`Server started on port ${3000}`));