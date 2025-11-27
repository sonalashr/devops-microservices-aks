FROM node:18-alpine

WORKDIR /app

# copy package files (both package.json and package-lock.json if present)
COPY package*.json ./

# install dependencies without dev deps
RUN npm install --omit=dev

# copy the rest of the source
COPY . .

# app listens on 3002
EXPOSE 3002

CMD ["npm", "start"]
