const Express = require("express")
const app = Express()
const router = Express.Router()
const usuario = require("../Models/Usuario")
const passport = require("passport")
const {isUser} = require("../Helpers/isUser")

router.get("/login", function(req,res){
    res.sendFile(__dirname + "/Views/index.html")
 })
router.post("/login", passport.authenticate('local',{
  failureRedirect: '/usuario/login',
}),
  function(req, res) {
    console.log(req.user.nome)
    res.redirect('/usuario/home')
  }
)
router.get("/home", isUser,  function(req,res){
   if(req.user){
      res.sendFile(__dirname + "/Views/home.html")
   }else{
      console.log("error")
   }
})

router.get("/cadastro", function(req,res){
    res.sendFile(__dirname + "/Views/cadastro.html")
 })
router.post("/cadastro", function(req,res){
   //Autenticação de formulário 
   if(req.body.nome === null){
      console.log("Dados inválidos")
   }else if(!req.body.user || typeof req.body.user === undefined || req.body.user === null){
      console.log("Dados inválidos ou insuficientes")
   }else if(!req.body.password || typeof req.body.password === undefined || req.body.password === null){
      console.log("Dados inválidos ou insuficientes")
   }else if(req.body.password < 8){
      console.log("Dados inválidos ou insuficientes")
   }else{
     usuario.create({
        nome: req.body.name,
        email: req.body.email,
        user: req.body.user,
        senha: req.body.password
     }).then(function(){
        res.redirect("/")
     }).catch(function(erro){
        res.send("Erro ao cadastrar: " + erro)
     })
   }
})
router.get("/logout", function(req,res){
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
})
router.get("/perfil", function(req,res){
   res.sendFile(__dirname + "/Views/perfil.html")
})
router.get("/delete", function(req,res){
   usuario.destroy({
      where: {
          id: req.user.id
      }
  })
  res.redirect("/")
})
router.post("/editar", function(req,res){
   if(req.user.senha === req.body.password){
       usuario.update(
        {nome: req.body.name,
         email: req.body.email,
        },
        {where: {id: req.user.id}}
        )
        res.redirect("/usuario/home")
      }else{
         res.redirect("/usuario/perfil")
      }
})

module.exports = router