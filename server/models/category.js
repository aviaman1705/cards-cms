const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
});

const Category = mongoose.model("Category", categorySchema);

function validateCategory(category) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(255).required(),
  });

  return schema.validate(category);
}

exports.Category = Category;
exports.validateCategory = validateCategory;
