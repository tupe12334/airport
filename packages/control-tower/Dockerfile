FROM node:16-alpine
WORKDIR /usr/airport/tower
COPY package*.json .
COPY . .
RUN npm ci
RUN npm run build
COPY .env ./dist/
RUN node ./dist/seed.js
ENV PORT=5000
EXPOSE 5000

CMD npm run start