const router = require("express").Router();
const { checktoken } = require("./tokenvalid");

const {
    userRegister,
    userLogin,
    getUsers,
    userLeaderboard,
    userEdit,
    putLeaderboard
} = require("./controller")

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/edit",checktoken, userEdit);
router.get("/leader", userLeaderboard);
router.get("/addleader", putLeaderboard);
router.get("/getuser", getUsers);

module.exports = router;