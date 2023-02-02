const {
  addMessage,
  getMessages,
  getAllMessages,
} = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addMsg/", addMessage);
router.post("/getMsg/", getMessages);
router.get("/getAllMsg/", getAllMessages);

module.exports = router;
