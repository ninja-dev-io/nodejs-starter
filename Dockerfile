FROM node:latest

EXPOSE 5000

COPY ["package.json", "."]

RUN npm install

COPY . .

RUN mkdir /dist

RUN npm run build

CMD [ "node", "./dist/app.js" ]