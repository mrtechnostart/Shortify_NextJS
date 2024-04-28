FROM node:20

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY ./prisma .

RUN yarn prisma generate

COPY . .

EXPOSE 3000

CMD [ "yarn","dev" ]
