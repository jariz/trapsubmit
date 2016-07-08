var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Submission = mongoose.model('Submission'),
    multer = require('multer'),
    upload = multer({
        dest: 'uploads/',
        fileFilter: function(req, file, cb) {
            if(file.mimetype !== "audio/mp3") {
                cb(new Error("Invalid file type, please choose a MP3 file."), false)
            } else {
                cb(null, true)
            }
        },
        limits: {
            fileSize: 209715200 //200mb
        }
    })


module.exports = function (app) {
    app.use('/', router);
};

router.get('/', function (req, res, next) {
    res.render('index', { body: {} });
});

router.post('/', upload.fields([{ name: 'fullmix', maxCount: 1 }, { name: 'teasermix', maxCount: 1 }]), function (req, res, next) {
    req.checkBody('username', 'Enter a reddit username').notEmpty()
    req.checkBody('url', 'Enter a valid URL').optional({ checkFalsy: true }).isURL()
    
    // console.log(req.files)
    // console.log(req.body)
    
    var errors = req.validationErrors();
    if(errors.length) {
        res.render('index', { errors: errors, body: req.body })
    } else {
        var submission = new Submission();
        submission.username = req.body.username
        submission.artistname = req.body.artistname
        submission.url = req.body.url
        submission.tracklist_teasermix = req.body.tracklist_teasermix
        submission.tracklist_fullmix = req.body.tracklist_fullmix
        submission.fullmix = req.files.fullmix[0]
        submission.teasermix = req.files.teasermix[0]
        submission.group = 0
        submission.save()
        
        res.render('index', { success: true, body: req.body })
    }
    
});