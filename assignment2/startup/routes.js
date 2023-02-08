const express = require("express");
const fs = require("fs");
const bodyParser = require('body-parser');
const Image = require('../models/image');
const upload = require("../middleware/multer")();

module.exports = function (app) {

        app.use(bodyParser.urlencoded({
        extended: false
        }));
        

        app.get( '/', function( req, res ) { 
            res.sendFile( __dirname + '/public/index.html' );
        }); 
        
        
        
        app.get("/view", (req, res) => {
            Image.find({}, "name", (err, images) => {
              if (err) {
                console.log(err);
              } else {
                let imagesArray = [];
                images.forEach(function(image)
                {
                  imagesArray.push(image);
                });
                res.send(imagesArray);
                }
              
            });
          });
        
        
        
        app.post("/upload",upload.single('image'),(req,res)=>{
            console.log(req)
            var base_img = fs.readFileSync(req.file.path);
            var encode_img = base_img.toString('base64');
            const final_img = new Image(
            {
                name: req.body.name,
                img :
                {
                    data:new Buffer(encode_img,'base64'),
                    contentType:req.file.mimetype
                    
                }
                
            });
            final_img
            .save()
            .then(() => res.redirect("/"))
            .catch((err) => res.status(400).json("Error: " + err));
        
        })
        
        
        app.get("/download/:id", (req, res) => {
            Image.findById(req.params.id,function(err,result){
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                    res.contentType(result.img.contentType);
                    res.send(result.img.data);
                }
            })
              
          });

};