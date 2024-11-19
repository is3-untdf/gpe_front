FROM node:20-alpine AS build

WORKDIR /app

COPY package.json yarn.lock .

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx:1.27

COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html/gpe2024

COPY env.sh /docker-entrypoint.d/env.sh

RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]