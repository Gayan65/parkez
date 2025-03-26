FROM node:20.10.0

#build app

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build

#serve with nginx

FROM nginx:1.24-alpine

WORKDIR /usr/share/nginx/html

RUN rm-rf *

COPY --from=build /app/build .

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
