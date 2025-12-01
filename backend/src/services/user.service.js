// Business logic for users
// Location: backend/src/services/user.service.js

const { prisma } = require('../config/db');
const { Role } = require('@prisma/client');

/**
 * Get user profile by ID
 * @param {Number} userId - User ID
 * @returns {Object} User profile with ratings if store owner
 */
const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      address: true,
      createdAt: true,
      updatedAt: true,
      ratings: {
        select: {
          id: true,
          rating: true,
          storeId: true,
          store: {
            select: {
              id: true,
              name: true,
              email: true,
              address: true,
            },
          },
          createdAt: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

/**
 * Get all users with filtering and sorting (Admin only)
 * @param {Object} options - Query options (page, limit, sortBy, sortOrder, search, role)
 * @returns {Object} Paginated users list
 */
const getAllUsers = async (options = {}) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    search = '',
    role,
  } = options;

  const skip = (page - 1) * limit;

  // Build where clause
  const where = {};
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { address: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (role) {
    where.role = role;
  }

  // Get users and total count
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        address: true,
        createdAt: true,
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * Get user by ID with full details (Admin only)
 * @param {Number} userId - User ID
 * @returns {Object} User with all details including ratings
 */
const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      address: true,
      createdAt: true,
      updatedAt: true,
      ratings: {
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
      },
      stores: {
        select: {
          id: true,
          name: true,
          email: true,
          address: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

/**
 * Create a new user (Admin only)
 * @param {Object} userData - User data
 * @returns {Object} Created user
 */
const createUser = async (userData) => {
  const { email, password, name, address, role } = userData;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const bcrypt = require('bcrypt');
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      address: address || null,
      role: role || Role.USER,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      address: true,
      createdAt: true,
    },
  });

  return user;
};

module.exports = {
  getProfile,
  getAllUsers,
  getUserById,
  createUser,
};


