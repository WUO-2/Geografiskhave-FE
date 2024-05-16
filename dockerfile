FROM node:22-alpine

WORKDIR /app

COPY package.json . 

RUN npm install

COPY . .

RUN npm run build-only

EXPOSE 5173

CMD ["npm", "run", "preview"]
