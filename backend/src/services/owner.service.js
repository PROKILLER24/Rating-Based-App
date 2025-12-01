// Business logic for store owners
// Location: backend/src/services/owner.service.js

const { prisma } = require('../config/db');

/**
 * Get store owner's dashboard data
 * @param {Number} ownerId - Store owner user ID
 * @returns {Object} Owner dashboard data
 */
const getOwnerDashboard = async (ownerId) => {
  // Get owner's stores
  const stores = await prisma.store.findMany({
    where: { ownerId },
    include: {
      ratings: {
        include: {
          user: {
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
      },
    },
  });

  // Calculate statistics for each store
  const storesWithStats = stores.map((store) => {
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
      ratings: store.ratings.map((r) => ({
        id: r.id,
        rating: r.rating,
        user: r.user,
        createdAt: r.createdAt,
      })),
      createdAt: store.createdAt,
    };
  });

  return {
    stores: storesWithStats,
    totalStores: stores.length,
    totalRatings: stores.reduce((sum, s) => sum + s.ratings.length, 0),
  };
};

/**
 * Get users who rated a specific store (Owner only)
 * @param {Number} storeId - Store ID
 * @param {Number} ownerId - Store owner user ID (for authorization)
 * @returns {Object} Store with ratings and users
 */
const getStoreRatings = async (storeId, ownerId) => {
  // Verify store belongs to owner
  const store = await prisma.store.findFirst({
    where: {
      id: storeId,
      ownerId,
    },
    include: {
      ratings: {
        include: {
          user: {
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
      },
    },
  });

  if (!store) {
    throw new Error('Store not found or you do not have access to it');
  }

  // Calculate average rating
  const avgRating = store.ratings.length > 0
    ? store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length
    : 0;

  return {
    store: {
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      averageRating: Number(avgRating.toFixed(2)),
      totalRatings: store.ratings.length,
    },
    ratings: store.ratings.map((r) => ({
      id: r.id,
      rating: r.rating,
      user: r.user,
      createdAt: r.createdAt,
    })),
  };
};

module.exports = {
  getOwnerDashboard,
  getStoreRatings,
};

