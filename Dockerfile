FROM node:boron

COPY . .

WORKDIR .

EXPOSE 3000

CMD ["node", "./app.js"]
