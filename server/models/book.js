const { Schema, model } = require("mongoose");
const { nanoid } = require("nanoid");

const BookSchema = new Schema({
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
  genre: {
    trim: true,
    type: String,
  },
  yearOfRelease: Number,
  authorId: {
    type: String,
    trim: true,
  },
});

module.exports = model("Book", BookSchema);
