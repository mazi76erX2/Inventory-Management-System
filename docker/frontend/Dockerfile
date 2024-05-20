FROM node:22-alpine

WORKDIR /frontend

COPY package.json package-lock.json ./
RUN npm ci --production

COPY . .

CMD ["npm", "start"]
