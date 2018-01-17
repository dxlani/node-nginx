FROM node:6.9.5
#nginx服务器
RUN apt-key adv --keyserver pgp.mit.edu --recv-keys 573BFD6B3D8FBC641079A6ABABF5BD827BD9BF62
RUN echo "deb http://nginx.org/packages/mainline/debian/ wheezy nginx" >> /etc/apt/sources.list

ENV NGINX_VERSION 1.7.12-1~wheezy

RUN apt-get update && \
    apt-get install -y ca-certificates nginx && \
    rm -rf /var/lib/apt/lists/*

RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

COPY ./conf/nginx.conf /etc/nginx/nginx.conf
COPY ./conf/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

#RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
#RUN cnpm install -g @angular/cli@v1.0.0

RUN mkdir -p /app

WORKDIR /app
#COPY ./package.json /app/

#RUN cnpm install

COPY . /app/

#RUN ng build

RUN cp -R /app/dist/*  /usr/share/nginx/html
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezoness
CMD ["nginx", "-g", "daemon off;"]