FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/enginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html