FROM node:12

WORKDIR /home/greenwallet-node-receitas
COPY package.json ./

RUN npm install
COPY . .
ENV PORT 3005
EXPOSE $PORT
CMD npm run dev