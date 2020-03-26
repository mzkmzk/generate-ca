FROM node:latest
WORKDIR /code
COPY . .
RUN apt-get update
RUN apt-get -y install  gettext-base
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install 
RUN npm install -g pm2@4.2.3
RUN chmod -R 755 /code/src/shell
CMD ["npm", "run", "build"]
