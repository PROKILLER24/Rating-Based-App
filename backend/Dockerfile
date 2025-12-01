# Backend Dockerfile
# Location: backend/Dockerfile

FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (including dev for Prisma)
RUN npm ci

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "run", "start"]


