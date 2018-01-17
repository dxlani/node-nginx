FROM node:6.9.5

# Create app directory
#在Image里创建一个文件夹，将来用于保存我们的代码
RUN mkdir -p /home/Service
#WORKDIR是将我们创建的文件夹做为工作目录
WORKDIR /home/Service 

# Install app dependencies
#COPY是把本机当前目录下的所有文件拷贝到Image的/home/Service文件夹下。
COPY . /home/Service
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install
#RUN cnpm i -g pm2 --save
EXPOSE 2017
CMD [ "npm", "start"]
# -d 表明容器会在后台运行，-p 表示端口映射，把本机的2017商品映射到container的80端口这样外网就能通过本机的2017访问我们的web了。