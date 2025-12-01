// Business logic for admin operations
// Location: backend/src/services/admin.service.js

const { prisma } = require('../config/db');

/**
 * Get admin dashboard statistics
 * @returns {Object} Dashboard statistics
 */
const getDashboardStats = async () => {
  const [totalUsers, totalStores, totalRatings] = await Promise.all([
    prisma.user.count(),
    prisma.store.count(),
    prisma.rating.count(),
  ]);

  // Get users by role
  const usersByRole = await prisma.user.groupBy({
    by: ['role'],
    _count: {
      role: true,
    },
  });

  const roleStats = usersByRole.reduce((acc, item) => {
    acc[item.role] = item._count.role;
    return acc;
  }, {});

  return {
    totalUsers,
    totalStores,
    totalRatings,
    usersByRole: {
      ADMIN: roleStats.ADMIN || 0,
      USER: roleStats.USER || 0,
      OWNER: roleStats.OWNER || 0,
    },
  };
};

module.exports = {
  getDashboardStats,
};

