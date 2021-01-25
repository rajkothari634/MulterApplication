const router = require("express").Router(),
  saveAtDest = require("../controllers/file/saveatdest"),
  anyFile = require("../controllers/file/anyfile"),
  arrayFile = require("../controllers/file/arrayfile"),
  fieldsFile = require("../controllers/file/fieldsfile"),
  singleFile = require("../controllers/file/singlefile"),
  textFile = require("../controllers/file/textfile");
const multer  = require('multer');
// var upload = multer({ dest: 'uploads/' }); //you can use this too
var diskStorage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, '/tmp/my-uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var uploadAtDest = multer({ storage: diskStorage });
var memoryStorage = multer.memoryStorage();
var upload = multer({ storage: memoryStorage });

router.post("/saveAtDest",uploadAtDest.single('avatar'), saveAtDest.saveAtDest);
router.post("/arrayFile", upload.array('avatar',10),arrayFile.arrayFile);
router.post("/textFile",upload.none(),textFile.textFile);
router.post("/anyFile", upload.any(),anyFile.anyFile);
router.get("/fieldsFile", upload.fields(['avatar','feed']),fieldsFile.fieldsFile)
router.get("/singleFile", upload.single('avatar') ,singleFile.singleFile)

module.exports = router;
