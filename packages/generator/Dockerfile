FROM node:16-alpine
WORKDIR /usr/airport/generator
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
COPY .env ./dist/

CMD npm run start