
FROM node:latest AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html

COPY --from=build /app/node_modules /usr/share/nginx/html/node_modules

COPY ./conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
