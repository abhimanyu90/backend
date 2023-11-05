

const express = require('express');
const mongoose = require('mongoose');
const recipeSchema = require('../model/recipeSchema');
const RateComment = require('../model/rateCommentSchema');

const recipeRoute = express.Router();

recipeRoute.get("/", (req, res) => {
    recipeSchema.find((err, data) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.json(data);
        }
    });
});

recipeRoute.post("/upload-recipe", (req, res) => {
    const { image, description, recipeName } = req.body;

    const newRecipe = new recipeSchema({
        image,
        description,
        recipeName,
        ratings: [],
    });

    newRecipe.save((err, recipe) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(recipe);
    });
});

recipeRoute.delete("/delete-recipe/:id", (req, res) => {
    const recipeId = mongoose.Types.ObjectId(req.params.id); // Convert ID to ObjectID

    recipeSchema.findByIdAndRemove(recipeId, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.json(data);
        }
    });
});

recipeRoute.get("/get-recipe/:id", (req, res) => {
    const recipeId = mongoose.Types.ObjectId(req.params.id); // Convert ID to ObjectID

    recipeSchema.findById(recipeId, (err, data) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            res.json(data);
        }
    });
});
recipeRoute.post("/rate-comment/:id", (req, res) => {
    const { name, email, rating, comments } = req.body;
    const recipeId = mongoose.Types.ObjectId(req.params.id);

    if (!recipeId) {
        return res.status(400).json({ error: "Recipe ID is missing" });
    }

    const newRateComment = new RateComment({
        recipeId: recipeId,
        name,
        email,
        rating,
        comments,
    });

    newRateComment.save((err, rateComment) => {
        if (err) {
            return res.status(500).send(err);
        }

        // Update the recipe's ratings array with the new rateComment's _id
        recipeSchema.findByIdAndUpdate(
            recipeId,
            { $push: { ratings: rateComment._id } },
            (updateError, updatedRecipe) => {
                if (updateError) {
                    return res.status(500).send(updateError);
                }
                res.status(200).json(rateComment);
            }
        );
    });
});
recipeRoute.get("/get-ratings-comments/:id", (req, res) => {
    const recipeId = mongoose.Types.ObjectId(req.params.id);

    recipeSchema.findById(recipeId)
        .populate('ratings') // Populate the ratings field with RateComment documents
        .exec((err, data) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.json(data.ratings);
            }
        });
});



module.exports = recipeRoute;
