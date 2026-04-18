const repo = require("../repositories/dog.repositories");
const AppError = require("../utils/AppError");
const ERRORS = require("../constants/errorCodes");
const MSG = require("../constants/messages");
const logger = require("../utils/logger");

exports.createDog = async (data) => {
  try {
    return await repo.create(data);
  } catch (err) {
    if (err.code === 11000) {
      logger.error(`Breed already exists: ${data.breed}`);
      throw new AppError(MSG.BREED_EXISTS, 400, ERRORS.DUPLICATE_ERROR);
    }
    logger.error(`Error creating dog: ${err.message}`);
    throw new AppError("Error creating dog", 500, ERRORS.INTERNAL_ERROR);
  }
};

exports.getDogs = async (query) => {
  try {
    let {
      page = 1,
      limit = 10,
      breed,
      subBreed,
      sortBy = "breed",
      order = "asc",
    } = query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (page < 1 || limit < 1) {
      throw new AppError("Invalid pagination values", 400, ERRORS.BAD_REQUEST);
    }

    const skip = (page - 1) * limit;

    const filter = {
      isDeleted: false,
    };

    if (breed) {
      filter.breed = { $regex: breed, $options: "i" };
    }

    if (subBreed) {
      filter.subBreeds = { $in: subBreed.split(",") };
    }

    if (limit > 100) limit = 100;

    const sort = { [sortBy || "breed"]: order === "desc" ? -1 : 1 };

    const dogs = await repo.findAll(filter, skip, limit, sort);
    console.log(`Fetched ${JSON.stringify(dogs)} dogs with filter:`, filter);
    const total = await repo.countDocuments(filter);
    if (dogs.length === 0) {
      logger.info(`No dogs found with the given criteria`);
    }
    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: dogs,
    };
  } catch (err) {
    logger.error(`Error fetching dogs: ${err.message}`);
    throw new AppError(err.message, 500, ERRORS.BAD_REQUEST);
  }
};

exports.updateDog = async (id, data) => {
  const filter = {
    _id: id,
    isDeleted: false
  };
  const dog = await repo.update(filter, data);
  if (!dog) {
    logger.error(`Dog not found with ID: ${id}`);
    throw new AppError(`${MSG.DOG_NOT_FOUND} ${id}`, 404, ERRORS.NOT_FOUND);
  }
  return dog;
};

exports.deleteDog = async (id, deleteData) => {
  const filter = {
    _id: id,
    isDeleted: false
  };
  console.log(`Deleting dog with filter:`, filter);
  const dog = await repo.update(filter, deleteData);
  console.log(`Delete result for ID ${id}:`, dog);
  if (!dog) {
    logger.error(`Dog not found with ID: ${id}`);
    throw new AppError(`${MSG.DOG_NOT_FOUND} ${id}`, 404, ERRORS.NOT_FOUND);
  }
  return dog;
};

exports.countDocuments = async () => {
  try {
    return await repo.countDocuments();
  } catch (err) {
    logger.error(`Error counting documents: ${err.message}`);
    throw new AppError(MSG.COUNT_DOCUMENTS, 500, ERRORS.INTERNAL_ERROR);
  }
};

exports.insertMany = async (data) => {
  try {
    return await repo.insertMany(data);
  } catch (err) {
    logger.error(`Error seeding database: ${err.message}`);
    throw new AppError(MSG.DATA_INSERT_ERROR, 500, ERRORS.INTERNAL_ERROR);
  }
};
