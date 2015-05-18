var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/catchphrasely");

var catchPhraseSchema = new mongoose.Schema({
  phrase: {
    type: String,
    default: ""
  },
  definition: {
    type: String,
    default: ""
  }
});

var CatchPhrase = mongoose.model("CatchPhrase", catchPhraseSchema);

module.exports.CatchPhrase = CatchPhrase;