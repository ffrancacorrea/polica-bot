FROM node:lts
WORKDIR /bot 
COPY . .
RUN npm install
ENTRYPOINT ["npm","start"]

