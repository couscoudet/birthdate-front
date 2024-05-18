FROM node:lts-alpine3.19 AS prod

LABEL maintainer="ysoultane@gmail.com"

RUN apk --update add tzdata \
&& cp /usr/share/zoneinfo/Europe/Paris /etc/localtime \
&& echo "Europe/Paris" > /etc/timezone \
&& apk del tzdata

COPY . /app

WORKDIR /app

RUN npm install --silent

RUN npm run build

FROM nginx:alpine AS server

WORKDIR /usr/local/bin

COPY --from=prod /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]