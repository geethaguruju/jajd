const express               =  require('express'),
      app                   =  express(),
      mongoose              =  require("mongoose"),
      passport              =  require("passport"),
      bodyParser            =  require("body-parser"),
      LocalStrategy         =  require("passport-local"),
      passportLocalMongoose =  require("passport-local-mongoose"),
      volunteer             =  require("./models/volunSchema");
      emergency             =  require("./models/emergencySchema");
      subscribe             =  require("./models/subscrSchema");
      const path = require('path');
      const dotenv = require('dotenv');
      

      dotenv.config()

      app.use(express.json())
//Connecting database
//mongoose.connect("mongodb://localhost/auth_demo");

app.use(express.static(path.join(__dirname, 'Front_end')));

app.use(require("express-session")({
    secret:"Any normal Word",       //decode or encode session
    resave: false,          
    saveUninitialized:false    
}));


app.set("view engine","ejs");
app.use(bodyParser.urlencoded(
      { extended:true }
))
app.use(passport.initialize());
app.use(passport.session());

//=======================
//      R O U T E S
//=======================

app.get("/", (req,res) =>{
    res.sendFile(__dirname + '/Front_end/index.html')
})

app.get("/speech", (req,res) =>{
    res.sendFile(__dirname + '/Front_end/speech.html')
})

app.post("/",(req,res)=>{
        var now = new emergency();
        now.name = req.body.name;
        now.phone = req.body.number;

        now.save((err,doc) => {
            if(!err) res.redirect('/');
            else 
                console.log('Error during record insertion: '+ err); 
        })
});


app.get("/vol", (req,res) =>{
    res.sendFile(__dirname + '/Front_end/form.html');
})

app.post("/vol",(req,res)=>{
    
    var volun = new volunteer();
    volun.name = req.body.name;
    volun.email = req.body.email;
    volun.phone = req.body.phone;
    volun.location = req.body.location;
    volun.message = req.body.message;
    volun.save((err, doc) => {
        if (!err)
            res.redirect('/');
            else
                console.log('Error during record insertion : ' + err);
        }
    )
});

const url = process.env.MONGO_URI;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

//Listen On Server


app.listen(process.env.PORT ||3000,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At Port 3000");
    }
      
});