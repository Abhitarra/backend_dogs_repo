const Dog = require('../models/dog.models');

exports.create = async (data) => Dog.create(data);

exports.findAll = async (filter, skip, limit, sort) => {
  return await Dog.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean();
};

exports.findById = async (id) => Dog.findById(id);

exports.update = async(filter, data) => {
  return await Dog.findOneAndUpdate(filter, 
    {
      ...data,
      updatedAt: new Date()
    }, { new: true }
  );
}

exports.delete = async (id) => {
  return await Dog.findByIdAndDelete(id);
};

exports.countDocuments = async () => Dog.countDocuments({ isDeleted: false });

exports.insertMany = async (data) => Dog.insertMany(data);

exports.findByIdAndUpdate = async (id, updateData, options) =>
  Dog.findByIdAndUpdate(id, updateData, options);