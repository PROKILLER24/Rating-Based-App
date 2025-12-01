# Frontend Dockerfile
# Location: frontend/Dockerfile

FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy application code
COPY . .

# Expose port
EXPOSE 5173

# Start dev server (for production, use build + serve)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


