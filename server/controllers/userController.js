const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({
        msg: "Tài khoản hoặc mật khẩu không đúng",
        status: false,
      });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({
        msg: "Tài khoản hoặc mật khẩu không đúng",
        status: false,
      });
    const access_token = createAccessToken({ userId: user._id });
    delete user.password;

    return res.json({
      status: true,
      meg: "Đăng nhập thành công",
      access_token,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.register = async (req, res) => {
  try {
    const { username, email, password, avatarImage } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Tên người dùng đã được sử dụng", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email đã được sử dụng", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      avatarImage,
    });
    const access_token = createAccessToken({ userId: user._id });
    delete user.password;
    return res.json({
      status: true,
      meg: "Đăng ký thành công",
      access_token,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } });
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.logOut = (req, res) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.updateUser = async (req, res, next) => {
  const {
    fullName,
    gender,
    address,
    desc,
    avatarImage,
    year,
    gender_like,
    matches,
    interests,
    ques1,
    ques2,
    ques3,
    ques4,
    ques5,
    ques6,
  } = req.body;
  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - year;
  const userId = req.params.id;
  if (!fullName)
    return res
      .status(400)
      .json({ status: false, message: "Chưa nhập Họ và tên" });
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        avatarImage,
        fullName,
        age: currentAge,
        gender,
        address,
        desc,
        year,
        gender_like,
        matches,
        ques1,
        ques2,
        ques3,
        ques4,
        ques5,
        ques6,
        interests,
      },
      { new: true }
    );

    res.json({
      status: true,
      msg: "Cập nhật thành công!",
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getProfileUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const users = await User.findById(userId).populate([
      "username",
      "fullName",
      "email",
      "age",
      "gender",
      "address",
      "desc",
      "ques1",
      "ques2",
      "ques3",
      "ques4",
      "ques5",
      "ques6",
    ]);
    if (!users)
      return res.status(400).json({ msg: "Người dùng không tồn tại" });

    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ msg: "Người dùng không tồn tại" });
    await User.findByIdAndDelete(userId);
    res.json({ success: true, msg: "Đã xóa thành công" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getGenderUser = async (req, res) => {
  try {
    // const gender = req.query.gender;
    const users = await User.find({
      gender: { $eq: req.query.gender_like },
    });
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.addMatch = async (req, res) => {
  const { ids, matchedUserId } = req.body;

  try {
    const query = { _id: ids };
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    };
    console.log(query);
    console.log(updateDocument);

    const user = await User.updateOne(query, updateDocument, { new: true });

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.getMatch = async (req, res) => {
  const userIds = req.query._id;

  console.log(userIds);
  try {
    const pipeline = [
      {
        $match: {
          _id: {
            $in: userIds,
          },
        },
      },
    ];

    const foundUsers = await User.aggregate(pipeline);

    res.json({ success: true, foundUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// tạo token cho người dùng
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
};
