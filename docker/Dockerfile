# Stage 1: Node.js Build
FROM node:20-alpine AS node-builder

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy application code
COPY package.json pnpm-lock.yaml .npmrc ./

# Install Node.js dependencies
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY app/ /app/app/
COPY public/ /app/public/
COPY config/ /app/config/
COPY tests/ /app/tests/
COPY translations/ /app/translations/
COPY types/ /app/types/
COPY vendor/ /app/vendor/
COPY .ember-cli .eslintrc.cjs tsconfig.json ember-cli-build.js /app/

# Build the frontend
RUN pnpm run build


# Stage 2: PHP Build
FROM composer:2 AS php-builder

# Set working directory
WORKDIR /app

# Copy application code
# COPY ./ /app

# Copy built frontend files from the Node.js stage
COPY --from=node-builder /app/dist /app/dist

# Install PHP dependencies
RUN composer install --working-dir=/app/dist --prefer-dist --no-dev --no-interaction --no-progress


# Stage 3: Final Runtime Image
FROM php:8.2-fpm-alpine

# Install necessary tools
RUN apk add --no-cache nginx

# Set working directory
WORKDIR /app

# Copy built application from PHP Builder
COPY --from=php-builder /app/dist /app

# Configure Nginx
COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf

# Expose the necessary ports
EXPOSE 80

LABEL org.opencontainers.image.source https://github.com/wonderkamer/website

# Start PHP and Nginx
CMD ["sh", "-c", "php-fpm & nginx -g 'daemon off;'"]
