var app     = require( 'express' )();
var http    = require( 'http' ).createServer( app );
var io      = require( 'socket.io' )( http );

const multer = require('multer');
const bodyParser = require('body-parser');
const Post = require('./models/post');

const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/local"



mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

const upload = multer({ storage: storage });


const PORT = 3000;





app.use(bodyParser.urlencoded({
    extended: false
 }));

app.get( '/', function( req, res ) { 
    res.sendFile( __dirname + '/public/index.html' );
}); 


app.get( '/view', function( req, res ) { 
    Post.find((error, people) => {
        if (error) {
          res.send(error);
        } else {
          res.send(people);
        }
      });
});

app.post("/upload",upload.single('myImage'),(req,res)=>{
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType:req.file.mimetype,
        image:new Buffer(encode_img,'base64')
    };
    imageModel.create(final_img,function(err,result){
        if(err){
            console.log(err);
        }else{
            console.log(result.img.Buffer);
            console.log("Saved To database");
            res.contentType(final_img.contentType);
            res.send(final_img.image);
        }
    })
})


http.listen( PORT, function() {
    console.log( 'listening on *:' + PORT );
});


var upvote_count = 0;
io.on( 'connection', function( socket ) {
    console.log( 'a user has connected!' );
    
    socket.on( 'disconnect', function() {
        console.log( 'user disconnected' );
    });
    
    socket.on( 'upvote-event', function( upvote_flag ) {
        upvote_count += upvote_flag ? 1: -1;
        var f_str = upvote_count + ( upvote_count == 1 ? ' upvote': ' upvotes');
        
        io.emit( 'update-upvotes', f_str );
    });
});