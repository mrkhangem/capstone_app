FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY black-cirrus-444210-r3-306a3125ac1a.json /app/black-cirrus-444210-r3-306a3125ac1a.json
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
EXPOSE 5000
CMD ["node", "index.js"]
