FROM node:18-alpine

WORKDIR /app

# copy only package files first (better for caching)
COPY package*.json ./

# install prod dependencies
RUN npm install --omit=dev

# copy the rest of the source
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
