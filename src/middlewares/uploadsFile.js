const multer = require('multer');

exports.uploadsFile = (imageFile) => {
    const storage = multer.diskStorage({
        destination: function (req, res, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""))
        }
    })
    const fileFilter = (req, file, cb) => {
        if (file.fieldname === imageFile) {
            if (!file.originalname.match(/\.(jpg|JPG|JPEG|png|PNG|svg)$/)) {
                req.fileValidationError = {
                    message: "Only Images File are allowed!"
                }
                return cb(new Error("Only Image Files are Allowed", false))
            }
            cb(null, true)
        }
    }

    const sizeinMB = 10;
    const maxSize = sizeinMB * 1024 * 1024;
    const upload = multer({
        storage,
        fileFilter,
        limits: {
            fileSize: maxSize
        }
    }).fields([
        {
            name: imageFile,
            maxCount: 4
        }
    ])

    return (req, res, next) => {
        upload(req, res, function (err) {
            if (req.fileValidationError) {
                return res.status(400).send(req.fileValidationError)
            }
            if (!req.file && !err) {
                return res.status(400).send({
                    message: "Please Select File to Upload"
                })
            }
            if (err) {
                if (err.code === "LIMIT FILE SIZE") {
                    return res.status(400).send({
                        message: "Max file sized in 10MB"
                    })
                }
                return res.status(400).send(err)
            }
            return next();
        })
    }
};