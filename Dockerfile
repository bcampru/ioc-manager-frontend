# pull official base image
FROM node:slim
ARG REACT_APP_API_URL

# set working directory
WORKDIR /app

EXPOSE 3000

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./
RUN npm run build

# start app
CMD ["serve", "-s", "build"]