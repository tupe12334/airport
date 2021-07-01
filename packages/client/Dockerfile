FROM node:16-alpine
WORKDIR  /usr/airport/client
COPY package*.json .
COPY . .
RUN npm ci
RUN npm run build

EXPOSE 3000
CMD npm run start