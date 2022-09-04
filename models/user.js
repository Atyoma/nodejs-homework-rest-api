const { Schema, model } = require("mongoose");

const joi = require("joi");

const { handleSchemaValidationErrors } = require("../helpers");

const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSchemaValidationErrors);

const registerSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
  repeat_password: joi.ref("password"),
  subscription: joi.string().valueOf(...subscriptionList),
});

const loginSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});
const schemas = { registerSchema, loginSchema };

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
