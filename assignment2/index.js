
var http    = require( 'http' ).createServer( app );
var io      = require( 'socket.io' )( http );

const fs = require("fs");

const bodyParser = require('body-parser');
const Image = require('./models/image');

const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/local"



mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection


con.on('open', () => {
    console.log('connected...')
})


var app = require( 'express' )();

app.use(bodyParser.urlencoded({
  extended: false
}));



const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      console.log(file)
      cb(null, file.originalname);
    }
  });

const upload = multer({ storage: storage });


const PORT = 3000;




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
  

http.listen( PORT, function() {
    console.log( 'listening on *:' + PORT );
});



io.on( 'connection', function( socket ) {
    console.log( 'a user has connected!' );
    
    socket.on( 'disconnect', function() {
        console.log( 'user disconnected' );
    });
    
});