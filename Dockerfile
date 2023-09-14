FROM node:20-alpine AS dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .


FROM node:20-alpine AS prod

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

COPY --from=dev /usr/src/app/dist ./dist


CMD ["node", "dist/main"]