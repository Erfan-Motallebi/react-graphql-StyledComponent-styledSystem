const { Schema, model } = require("mongoose");
const { nanoid } = require("nanoid");

const AuthorSchema = new Schema({
  _id: {
    type: String,
    default: () => nanoid(),
  },
  name: {
    type: String,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  age: Number,
});

module.exports = model("Author", AuthorSchema);
