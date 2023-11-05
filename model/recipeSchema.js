


const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    image: String,
    description: String,
    recipeName: String,
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'rateCommentSchema' }], // Update ref to match the model name
}, {
    collection: "items",
});

module.exports = mongoose.model("recipeSchema", recipeSchema);

