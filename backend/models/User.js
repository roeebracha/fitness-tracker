const mongoose = require("mongoose");

const isLocalUser = () => {
  return !this.googleId;
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      sparse: true,
      required: isLocalUser,
    },
    name: { type: String },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /\S+@\S+\.\S+/,
    },
    password: { type: String, required: isLocalUser, select: true },
    googleId: {
      type: String,
      default: "",
      trim: true,
      unique: true,
      sparse: true,
    },
    picture: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  },
);

module.exports = mongoose.model("User", userSchema);
