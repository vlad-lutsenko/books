const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  pageCount: Number,
  publishedDate: {
    date: Date,
  },
  thumbnailUrl: String,
  shortDescription: String,
  longDescription: { type: String, text: true },
  status: {
    type: String,
    enum: ["PUBLISH", "IN PRINTERY", "WAITING FOR APPROVAL"],
    default: "WAITING FOR APPROVAL",
  },
  authors: [String],
});

module.exports = mongoose.model("Book", bookSchema);
