FROM node:16
WORKDIR /app/
COPY ./package.json ./
COPY ./ ./
RUN npm i
RUN npm config set user 0
RUN npm config set unsafe-perm true
CMD ["npm", "run", "start"]
