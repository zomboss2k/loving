const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    avatarImage: {
      type: String,
      default:
        "https://res.cloudinary.com/letiendat/image/upload/v1670174852/DefaultProfile_iwfny9.jpg",
    },
    rule: { type: Number, default: 1 },
    fullName: { type: String, default: "" },
    day: { type: Number, default: "" },
    month: { type: Number, default: "" },
    year: { type: Number, default: "" },
    age: { type: Number, default: "" },
    gender: { type: String, default: "" },
    gender_like: { type: String, default: "" },
    address: { type: String, default: "" },
    matches: { type: Array },
    interests: {
      type: Array,
    },
    desc: { type: String, default: "" },
    ques1: { type: String, default: "" },
    ques2: { type: String, default: "" },
    ques3: { type: String, default: "" },
    ques4: { type: String, default: "" },
    ques5: { type: String, default: "" },
    ques6: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
