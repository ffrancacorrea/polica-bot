FROM node:alpine
WORKDIR /bot 
COPY . .
RUN npm install
ENTRYPOINT ["npm","start"]

