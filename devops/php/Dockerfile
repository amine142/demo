#
# F2ML Webserver - front Dockerfile
#
FROM php:7.4-apache

#================================================   
LABEL version="1.0"
#================================================   

# Update the package repository
RUN apt-get update -y

#================================================
# Upgrade packages
RUN apt-get -y upgrade --fix-missing

RUN apt-get install -y software-properties-common curl build-essential fakeroot dpkg-dev libcurl4-openssl-dev  libpq-dev libzip-dev
#RUN LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php
#RUN echo "deb http://packages.dotdeb.org jessie all" >> /etc/apt/sources.list.d/dotdeb.lis
#RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 40976EAF437D05B5
ENV TZ=Europe/Paris
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN docker-php-ext-install pdo pdo_pgsql zip
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && composer --version
RUN a2enmod headers
RUN a2enmod rewrite
copy ./devops/php/entrypoint.sh /root/entrypoint.sh
RUN chmod 775 /root/entrypoint.sh
# Conf files - Apache
RUN rm -fr /etc/apache2/sites-available/
COPY ./devops/php/apache/conf /etc/apache2/
RUN rm -fr /etc/apache2/sites-enabled \
    && ln -s /etc/apache2/sites-available /etc/apache2/sites-enabled
COPY ./back/ /var/www/html/
COPY ./.env /var/www/html/.env
#================================================
WORKDIR  /var/www/html
RUN composer install 

ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
RUN chown -R www-data:www-data /var/www/

ENTRYPOINT ["/root/entrypoint.sh"]
EXPOSE 80 8082

#================================================ 

