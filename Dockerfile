FROM node:17.6

EXPOSE 5000

COPY ["package.json", "."]

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "./dist/app.js" ]