FROM node:16-alpine
WORKDIR /usr/airport/com
COPY package*.json .
COPY . .
RUN npm ci
RUN npm run build
COPY .env ./dist/

ENV PORT=5001
EXPOSE 5001

CMD npm run start