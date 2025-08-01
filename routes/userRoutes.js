const express = require("express");
const router = express.Router();
const { reg, login, islogin } = require("../controllers/userController");
const { addpost, getposts, like, share, comment } = require("../controllers/postController");

router.post("/reg", reg);
router.post("/login", login);
router.post("/addpost", islogin, addpost);
router.get("/getposts/:platform", islogin, getposts);
router.get("/like/:id", islogin, like);
router.get("/share/:id", islogin, share);
router.post("/comment/:id", islogin, comment);

module.exports = router;
