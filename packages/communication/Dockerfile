FROM node:16-alpine
WORKDIR /usr/airport/com
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000
CMD npm run start