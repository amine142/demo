# To change this license header, choose License Headers in Project Properties.
# To change this template file, choose Tools | Templates
# and open the template in the editor.
FROM ubuntu:latest
RUN apt-get update -y
ENV TZ=Europe/Paris
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get install -y curl apache2

# NodeJs install from updated sources
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
COPY ./front/ /var/www/html/
COPY ./.env /var/www/html/.env.local
#================================================
WORKDIR  /var/www/html
RUN rm -f /etc/apache2/sites-available/*
COPY ./devops/js/apache/conf/sites-available/front.conf /etc/apache2/sites-available/front.conf 
RUN rm -f /etc/apache2/sites-enabled/* \
    && ln -s /etc/apache2/sites-available/front.conf /etc/apache2/sites-enabled/front.conf
WORKDIR /var/www/html/
RUN npm install
RUN npm run build
RUN a2enmod headers 
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
EXPOSE 80
