FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apk add --no-cache netcat-openbsd

COPY . .

EXPOSE 3000

RUN npm run build

COPY ./scripts/init.sh ./scripts/init.sh

RUN chmod +x ./scripts/init.sh

CMD ["/bin/sh", "./scripts/init.sh"]