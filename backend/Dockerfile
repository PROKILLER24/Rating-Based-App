FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]


