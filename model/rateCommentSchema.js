


const mongoose = require('mongoose');

const rateCommentSchema = new mongoose.Schema({
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'recipeSchema' }, // Update ref to match the model name
    name: String,
    email: String,
    rating: Number,
    comments: String,
});

module.exports = mongoose.model('rateCommentSchema', rateCommentSchema);
