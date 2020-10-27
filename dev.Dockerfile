FROM node:lts-alpine3.12
WORKDIR /bot 
COPY . .
RUN npm install
ENTRYPOINT ["npm","start"]

