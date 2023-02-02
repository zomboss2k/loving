const {
  login,
  register,
  updateUser,
  getAllUsers,
  getProfileUser,
  logOut,
  deleteUser,
  getGenderUser,
  addMatch,
  getMatch,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.post("/updateUser/:id", updateUser);
router.get("/allUsers/:id", getAllUsers);
router.get("/profileUser/:id", getProfileUser);
router.get("/logout/:id", logOut);
router.put("/addMatch", addMatch);
router.get("/getMatch/:id", getMatch);
router.delete("/delete/:id", deleteUser);
router.get("/getGenderUser", getGenderUser);

module.exports = router;
