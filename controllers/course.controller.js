const db = require("../models");
const Course = db.courses;
const Op = db.Sequelize.Op;
const httpStatusText = require('../utils/httpStatusText');
const asyncWrapper = require('../middlewares/asyncWrapper');
const appError = require('../utils/appError');

// Create and Save a new Course
exports.create = asyncWrapper(async (req, res ,next) => {
  if (!req.body.title) {
    const error = appError.create(`Content can not be empty!`,400, httpStatusText.FAIL);
    return next(error);
  }
  const course = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  };
  const data = await Course.create(course);
  res.send(data);
});

// Retrieve all Courses from the database.
exports.findAll = asyncWrapper(async (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  const data = await Course.findAll({ where: condition });
  res.send(data);
});

// Find a single Course with an id
exports.findOne = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;

  const data = await Course.findByPk(id);
  if (data) {
    res.send(data);
  } else {
    const error = appError.create(`Cannot find Course with id=${id}.`, 404 ,httpStatusText.FAIL);
    next(error);
  }
});

// Update a Course by the id in the request
exports.update = asyncWrapper(async (req, res,next) => {
  const id = req.params.id;

  const num = await Course.update(req.body, {
    where: { id: id }
  });
  if (num == 1) {
    res.send({ message: "Course was updated successfully." });
  } else {
    // res.send({
    //   message: `Cannot update Course with id=${id}. Maybe Course was not found or req.body is empty!`
    // });
    const error = appError.create(`Cannot update Course with id=${id}.`, 404 ,httpStatusText.FAIL);
    next(error);
  }
});

// Delete a Course with the specified id in the request
exports.delete = asyncWrapper(async (req, res,next) => {
  const id = req.params.id;

  const num = await Course.destroy({
    where: { id: id }
  });
  if (num == 1) {
    res.send({ message: "Course was deleted successfully!" });
  } else {
    res.send({
      message: `Cannot delete Course with id=${id}. Maybe Course was not found!`
    });
  }
});

// Delete all Courses from the database.
exports.deleteAll = asyncWrapper(async (req, res) => {
  const nums = await Course.destroy({
    where: {},
    truncate: false
  });
  res.send({ message: `${nums} Courses were deleted successfully!` });
});
