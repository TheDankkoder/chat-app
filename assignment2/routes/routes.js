const express = require('express');
const multer = require('multer');
const fs = require('fs');
const Post = require('../models/post');
const router = express.Router()

const app = express();
const upload = multer({ dest: 'tmp/' });

// Route to handle file uploads
router.post('/upload', upload.single('file'), (req, res) => {
    // handle file upload logic here
});

// Route to handle file downloads
router.get('/download/:id', (req, res) => {
    // handle file download logic here
});

// Route to handle file viewing
router.get('/view/:id', (req, res) => {
    // handle file viewing logic here
});

// Route to return the list of files that have been uploaded
router.get('/list', (req, res) => {
    Data.find({}, (err, result) => {
        if (err) return res.status(404).send(err);
        res.status(200).send(result);
    });
});

module.exports = router