# 基础镜像
FROM registry.srv.codemao.cn:5000/codemao-master:8-onbuild

# 指定当前用户(codemao用户没有写入权限)
# USER codemao

# Workdir is unprivileged user home
WORKDIR /usr/src/app

# 安装依赖
COPY package.json package-lock.json .npmrc /usr/src/app/

RUN npm install

# 复制代码
COPY . /usr/src/app/

# 暴露内部端口号
EXPOSE 5000

# 起服务
# ENTRYPOINT ["npm", "run"]
CMD ["npm", "run", "server"]