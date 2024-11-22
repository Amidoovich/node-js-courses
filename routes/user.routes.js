
const users = require("../controllers/user.controller");
const multer = require('multer');
const diskStorage = multer.diskStorage({
        destination: function(req,file,cb) {
                console.log("FILE",file);
                cb(null,'uploads');
        },
        filename: function(req,file,cb) {
                const ext = file.mimetype.split('/')[1];
                const fileName =`user-${Date.now()}.${ext}`; 
                cb(null,fileName);
        }
});
const fileFilter = (req,file,cb) => {
        const imageType = file.mimetype.split('/')[0];
        if(imageType === 'image'){
                return cb(null,true);
        }else{
                return cb(appError.create('the file must be an image',400),false);
        }
};
const upload = multer({ 
        storage: diskStorage,
        fileFilter
});

var router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const appError = require("../utils/appError");
// Create a new Tutorial
router.route('/')
        .get(verifyToken,users.getAllUsers);
router.route('/register')
        .post(upload.single('avatar') ,users.register);
router.route('/login')
        .post(users.login);

module.exports =router;            