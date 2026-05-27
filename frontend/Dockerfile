# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine AS runtime

WORKDIR /app

COPY --from=builder /app/dist ./dist

ENV PORT=3000
EXPOSE $PORT

CMD ["sh", "-c", "npx serve -s dist -l $PORT"]
