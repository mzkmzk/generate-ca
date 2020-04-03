FROM node:latest
WORKDIR /code
COPY . .
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]
