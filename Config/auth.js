const localStrategy = require("passport-local").Strategy
const Sequelize = require("sequelize")
const bcrypt = require("bcryptjs")
const usuario = require("../Models/Usuario")


module.exports = function(passport){
  //configurando passport
    //verificando se o usuario existe no banco de dados 
    passport.use(new localStrategy({usernameField: "user", passwordField: "password"}, (user,password,done) => {
        usuario.findOne({where: {user: user}}).then((usuario) => {
            if(!usuario){
                return done(null,false)
            } 
            //verificando se a senha está correta
            if(password === usuario.senha){
                return done(null,usuario)
            }else{
                return done(null,false)
            }
            /*console.log(usuario.senha)
            console.log(password)
            bcrypt.compare(password, usuario.senha, (error, batem) => {
                if(batem){
                    console.log("senha correta")
                    return done(null,usuario)
                }else{
                    console.log("senha incorreta")
                    return done(null,false)
                }
            })*/
              
        })
    }))
    passport.serializeUser((usuario,done) => {
        done(null,usuario.id)
    })
    passport.deserializeUser((id,done) => {
        usuario.findOne({where: {id: id}}).then(usuario => done(null, usuario)).catch((err) => {
            done(err, null);
        });
    })
}