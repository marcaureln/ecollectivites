# Build
FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm set progress=false && npm ci
COPY . .
RUN npm run generate

# Serve
FROM nginx:stable-alpine as server
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]