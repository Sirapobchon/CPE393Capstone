const router = require("express").Router();
const { checktoken } = require("./tokenvalid");

const {
    userRegister,
    userLogin,
    getUsers,
    
} = require("./controller")

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/getuser",checktoken, getUsers);

module.exports = router;