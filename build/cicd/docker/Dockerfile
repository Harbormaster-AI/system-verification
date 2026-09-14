FROM node:12

# -----------------------------------------------
# install helpers
# -----------------------------------------------
RUN apt-get update --fix-missing && \
apt-get install -y dos2unix && \
apt-get install -y sed && \
apt-get install -y nano

# -----------------------------------------------
# copy all files to a working directory
# -----------------------------------------------
ARG PROJECT=demo
ARG PROJECT_DIR=/var/www/${PROJECT}
RUN mkdir -p $PROJECT_DIR
COPY entrypoint.sh /var/www/
COPY $CODEBUILD_SRC_DIR/appRoot/ /var/www/

# -----------------------------------------------
# install Angular-CLI and a core dependency
# -----------------------------------------------
RUN npm install --${BUILD_ENV} > /dev/null

# prepare entrypoint
RUN dos2unix /var/www/entrypoint.sh
RUN chmod +x /var/www/entrypoint.sh
ENTRYPOINT ["/var/www/entrypoint.sh"]
