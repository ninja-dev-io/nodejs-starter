FROM node:latest

EXPOSE 5000

COPY ["package.json", "."]

RUN npm install

COPY . .

RUN npm run build

RUN ls dist/

CMD [ "node", "./dist/app.js" ]