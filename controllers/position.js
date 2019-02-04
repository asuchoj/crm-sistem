const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');

module.exports.getByCategoryId = async function (req, res) {
  try{

  }catch (e) {
    errorHandler(res, e)
  }
};

module.exports.create = async function (req, res) {
  try{
    const positions = await Position.find({
      category: req.params.categoryId,
      uers: req.user.id
    })
  }catch (e) {
    errorHandler(res, e)
  }
  res.status(200).json(position)
};

module.exports.remove = async function (req, res) {
  try{

  }catch (e) {
    errorHandler(res, e)
  }
};

module.exports.update = async function (req, res) {
  try{

  }catch (e) {
    errorHandler(res, e)
  }
};