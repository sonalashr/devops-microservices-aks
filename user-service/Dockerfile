FROM node:18-alpine

WORKDIR /app

# copy dependency manifests
COPY package*.json ./

# install dependencies (prod only)
RUN npm install --omit=dev

# copy rest of the app
COPY . .

EXPOSE 3001

CMD ["npm", "start"]
