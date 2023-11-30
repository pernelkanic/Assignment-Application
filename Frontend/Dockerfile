# Build environment
FROM node:14 as builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY nginx.conf /usr/src/app/nginx.conf
RUN npm run build

# Production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY --from=builder /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
