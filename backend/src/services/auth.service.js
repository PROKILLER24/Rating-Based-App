// Business logic for authentication
// Location: backend/src/services/auth.service.js

const bcrypt = require('bcrypt');
const { prisma } = require('../config/db');
const { signToken } = require('../utils/jwt');
const { Role } = require('@prisma/client');

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Object} User data and token
 */
const register = async (userData) => {
  const { email, password, name, address, role } = userData;

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user (default role is USER, only admin can create other roles)
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

  // Generate token
  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    user,
    token,
  };
};

/**
 * Login user
 * @param {Object} credentials - Login credentials
 * @returns {Object} User data and token
 */
const login = async (credentials) => {
  const { email, password } = credentials;

  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate token
  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      address: user.address,
    },
    token,
  };
};

/**
 * Update user password
 * @param {Number} userId - User ID
 * @param {String} currentPassword - Current password
 * @param {String} newPassword - New password
 */
const updatePassword = async (userId, currentPassword, newPassword) => {
  // Get user
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Verify current password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordValid) {
    throw new Error('Current password is incorrect');
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update password
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  return { message: 'Password updated successfully' };
};

module.exports = {
  register,
  login,
  updatePassword,
};


