// Business logic for ratings
// Location: backend/src/services/rating.service.js

const { prisma } = require('../config/db');

/**
 * Create or update a rating
 * @param {Number} userId - User ID
 * @param {Number} storeId - Store ID
 * @param {Number} rating - Rating value (1-5)
 * @returns {Object} Created/updated rating
 */
const createOrUpdateRating = async (userId, storeId, rating) => {
  // Verify store exists
  const store = await prisma.store.findUnique({
    where: { id: storeId },
  });

  if (!store) {
    throw new Error('Store not found');
  }

  // Check if rating already exists
  const existingRating = await prisma.rating.findUnique({
    where: {
      userId_storeId: {
        userId,
        storeId,
      },
    },
  });

  let ratingRecord;
  if (existingRating) {
    // Update existing rating
    ratingRecord = await prisma.rating.update({
      where: { id: existingRating.id },
      data: { rating },
      include: {
        store: {
          select: {
            id: true,
            name: true,
            email: true,
            address: true,
          },
        },
      },
    });
  } else {
    // Create new rating
    ratingRecord = await prisma.rating.create({
      data: {
        userId,
        storeId,
        rating,
      },
      include: {
        store: {
          select: {
            id: true,
            name: true,
            email: true,
            address: true,
          },
        },
      },
    });
  }

  return {
    id: ratingRecord.id,
    rating: ratingRecord.rating,
    store: ratingRecord.store,
    createdAt: ratingRecord.createdAt,
    updatedAt: ratingRecord.updatedAt,
  };
};

/**
 * Get user's ratings
 * @param {Number} userId - User ID
 * @returns {Array} User's ratings
 */
const getUserRatings = async (userId) => {
  const ratings = await prisma.rating.findMany({
    where: { userId },
    include: {
      store: {
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return ratings;
};

/**
 * Delete a rating
 * @param {Number} ratingId - Rating ID
 * @param {Number} userId - User ID (for authorization)
 * @returns {Object} Success message
 */
const deleteRating = async (ratingId, userId) => {
  const rating = await prisma.rating.findUnique({
    where: { id: ratingId },
  });

  if (!rating) {
    throw new Error('Rating not found');
  }

  // Check if user owns this rating
  if (rating.userId !== userId) {
    throw new Error('You can only delete your own ratings');
  }

  await prisma.rating.delete({
    where: { id: ratingId },
  });

  return { message: 'Rating deleted successfully' };
};

module.exports = {
  createOrUpdateRating,
  getUserRatings,
  deleteRating,
};


