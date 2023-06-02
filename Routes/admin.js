const Express = require("express")
const router = Express.Router()

router.get("/", (req, res) => {
    res.send("Login de admin")
})
router.get("/home", (req, res) => {
    res.send("Welcome, admin!")
})

module.exports = router