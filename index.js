// Carregando módulos
  const Express = require("express")
  const app = Express()
  const bodyParser = require("body-parser")
  const handlebars = require("express-handlebars")
  const admin = require("./Routes/admin")
  const usuario = require("./Routes/usuario")
  const session = require('express-session')
  const flash = require("connect-flash")
  const path = require("path")
  const passport = require("passport")
  require("./Config/auth")(passport)

// Config
  //Sessions
    app.use(session({
        secret: "popBox",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())

    // Middlewares
    
    
    //Passport
    app.use(passport.initialize())
    app.use(passport.session())

    //Body-parser
    app.use(bodyParser.urlencoded({extended:false}))  
    app.use(bodyParser.json())

    //Static Files
    app.use(Express.static("Public"))

    //Routes
    app.get("/", function(req,res){
       res.sendFile(__dirname + "/Routes/Views/main.html")
    })
    app.use("/usuario", usuario)
    app.use("/admin", admin)

    //Conexão com o servidor
    app.listen(8081,function(){
      console.log("servidor rodando")
    })