// Business logic for stores
// Location: backend/src/services/store.service.js

const { prisma } = require('../config/db');

/**
 * Create a new store (Admin only)
 * @param {Object} storeData - Store data
 * @returns {Object} Created store
 */
const createStore = async (storeData) => {
  const { name, email, address } = storeData;

  // Check if store with same email exists
  const existingStore = await prisma.store.findFirst({
    where: { email },
  });

  if (existingStore) {
    throw new Error('Store with this email already exists');
  }

  // Create store
  const store = await prisma.store.create({
    data: {
      name,
      email,
      address,
    },
    include: {
      ratings: {
        select: {
          rating: true,
        },
      },
    },
  });

  // Calculate average rating
  const avgRating = store.ratings.length > 0
    ? store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length
    : 0;

  return {
    id: store.id,
    name: store.name,
    email: store.email,
    address: store.address,
    averageRating: Number(avgRating.toFixed(2)),
    totalRatings: store.ratings.length,
    createdAt: store.createdAt,
    updatedAt: store.updatedAt,
  };
};

/**
 * Get all stores with filtering, sorting, and search
 * @param {Object} options - Query options
 * @returns {Object} Paginated stores list with average ratings
 */
const getAllStores = async (options = {}) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    search = '',
  } = options;

  const skip = (page - 1) * limit;

  // Build where clause
  const where = {};
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { address: { contains: search, mode: 'insensitive' } },
    ];
  }

  // Get stores with ratings
  const stores = await prisma.store.findMany({
    where,
    include: {
      ratings: {
        select: {
          rating: true,
        },
      },
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip,
    take: limit,
  });

  // Calculate average ratings
  const storesWithRatings = stores.map((store) => {
    const avgRating = store.ratings.length > 0
      ? store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length
      : 0;

    return {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      averageRating: Number(avgRating.toFixed(2)),
      totalRatings: store.ratings.length,
      createdAt: store.createdAt,
      updatedAt: store.updatedAt,
    };
  });

  // Get total count
  const total = await prisma.store.count({ where });

  return {
    stores: storesWithRatings,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get store by ID with ratings
 * @param {Number} storeId - Store ID
 * @param {Number} userId - Optional user ID to get user's rating
 * @returns {Object} Store with ratings
 */
const getStoreById = async (storeId, userId = null) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId },
    include: {
      ratings: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!store) {
    throw new Error('Store not found');
  }

  // Calculate average rating
  const avgRating = store.ratings.length > 0
    ? store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length
    : 0;

  // Get user's rating if userId provided
  let userRating = null;
  if (userId) {
    const userRatingRecord = store.ratings.find((r) => r.userId === userId);
    if (userRatingRecord) {
      userRating = {
        id: userRatingRecord.id,
        rating: userRatingRecord.rating,
        createdAt: userRatingRecord.createdAt,
      };
    }
  }

  return {
    id: store.id,
    name: store.name,
    email: store.email,
    address: store.address,
    averageRating: Number(avgRating.toFixed(2)),
    totalRatings: store.ratings.length,
    userRating,
    ratings: store.ratings.map((r) => ({
      id: r.id,
      rating: r.rating,
      user: r.user,
      createdAt: r.createdAt,
    })),
    createdAt: store.createdAt,
    updatedAt: store.updatedAt,
  };
};

/**
 * Update store (Admin only)
 * @param {Number} storeId - Store ID
 * @param {Object} updateData - Store update data
 * @returns {Object} Updated store
 */
const updateStore = async (storeId, updateData) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId },
  });

  if (!store) {
    throw new Error('Store not found');
  }

  // Check email uniqueness if email is being updated
  if (updateData.email && updateData.email !== store.email) {
    const existingStore = await prisma.store.findFirst({
      where: { email: updateData.email },
    });

    if (existingStore) {
      throw new Error('Store with this email already exists');
    }
  }

  const updatedStore = await prisma.store.update({
    where: { id: storeId },
    data: updateData,
    include: {
      ratings: {
        select: {
          rating: true,
        },
      },
    },
  });

  // Calculate average rating
  const avgRating = updatedStore.ratings.length > 0
    ? updatedStore.ratings.reduce((sum, r) => sum + r.rating, 0) / updatedStore.ratings.length
    : 0;

  return {
    id: updatedStore.id,
    name: updatedStore.name,
    email: updatedStore.email,
    address: updatedStore.address,
    averageRating: Number(avgRating.toFixed(2)),
    totalRatings: updatedStore.ratings.length,
    createdAt: updatedStore.createdAt,
    updatedAt: updatedStore.updatedAt,
  };
};

/**
 * Delete store (Admin only)
 * @param {Number} storeId - Store ID
 */
const deleteStore = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId },
  });

  if (!store) {
    throw new Error('Store not found');
  }

  await prisma.store.delete({
    where: { id: storeId },
  });

  return { message: 'Store deleted successfully' };
};

module.exports = {
  createStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
};

