const service = require("../services/dog.service");
const breedsData = require("../../data/breeds");
const logger = require("../utils/logger");
const response = require("../utils/response");
const MSG = require("../constants/messages");

exports.createDog = async (req, res) => {
  req.body.createdBy = req.user.id; // Track who created the dog
  const dog = await service.createDog(req.body);
  const { _id, breed, subBreeds } = dog;
  logger.info(`Dog created: ${breed}`);
  return response.success(res, MSG.DOG_CREATED, { id: _id, breed, subBreeds }, 201);
};

exports.getDogs = async (req, res) => {
  const result = await service.getDogs(req.query);
  const dogResponses = result.data.map((dog) => ({
    id: dog._id,
    breed: dog.breed,
    subBreeds: dog.subBreeds,
  }));
  logger.info(`Retrieved successful dogs list`);
  return response.success(res, MSG.FETCH_SUCCESS, {
    ...result,
    data: dogResponses,
  });
};

exports.updateDog = async (req, res) => {
  const updateData = {
    ...req.body,
    updatedBy: req.user.id,
  };
  console.log("Update Data:", updateData);      
  const dog = await service.updateDog(req.params.id, updateData);
  logger.info(`Dog updated successfully: ${req.params.id}`);
  return response.success(res, MSG.DOG_UPDATED, dog);
};

exports.deleteDog = async (req, res) => {
  const deleteData = {
    isDeleted: true,
    deletedBy: req.user.id,
    deletedAt: new Date()
  };
  const dog = await service.deleteDog(req.params.id, deleteData);
  logger.info(`Dog deleted successfully: ${req.params.id}`);
  return response.success(res, MSG.DOG_DELETED, dog);
};

exports.seedDatabase = async () => {
  const count = await service.countDocuments();
  if (count === 0) {
    await service.insertMany(breedsData);
    logger.info("✅ Data seeded successfully");
  } else {
    logger.info("⚡ Data already exists, skipping seed");
  }
};
