FROM node:16-alpine
WORKDIR /usr/airport/tower
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
COPY .env ./dist/

ENV PORT=5000
EXPOSE 5000

CMD npm run start