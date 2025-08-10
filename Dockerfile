# --- STAGE 1: The Build Stage ---
FROM composer:2.6 AS builder

WORKDIR /app

RUN apk add --no-cache \
    libzip-dev \
    libpng-dev \
    jpeg-dev \
    libwebp-dev \
    libjpeg-turbo-dev \
    postgresql-dev \
    imagemagick-dev \
    git \
    nginx \
    libgd-dev

RUN docker-php-ext-install -j$(nproc) gd

COPY composer.json composer.lock ./

RUN composer install --no-dev --no-autoloader --no-scripts --no-interaction

COPY . .

RUN composer dump-autoload --optimize --no-dev

# --- STAGE 2: The Final Runtime Stage ---
FROM php:8.2-fpm-alpine

WORKDIR /app

RUN apk add --no-cache \
    libzip-dev \
    libpng-dev \
    jpeg-dev \
    libwebp-dev \
    libjpeg-turbo-dev \
    postgresql-dev \
    git \
    nginx \
    imagemagick-dev \
    libgd-dev

RUN docker-php-ext-configure gd --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    && rm -rf /tmp/*

RUN docker-php-ext-install pdo_mysql pdo_pgsql zip imagick

COPY --from=builder /app /app

COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

RUN chown -R www-data:www-data /app/storage

EXPOSE 80

CMD ["/usr/local/sbin/php-fpm", "--nodaemon", "--fpm-config", "/usr/local/etc/php-fpm.d/www.conf"]
