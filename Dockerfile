FROM node:20.17.0 AS builder

WORKDIR /app

ARG VITE_BASE_API_URL=https://api-dev.distilled.ai/distill

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN VITE_BASE_API_URL=${VITE_BASE_API_URL} npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
