FROM node:12

LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="bankingonapollo"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="Apollo GraphQL"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-09-13"
#LABEL com.harbormaster.certification="944f7c71-d981-4fba-bbe8-1c8372f5ac74"

# -----------------------------------------------
# install a few essentials
# -----------------------------------------------
RUN apt-get update --fix-missing && \
apt-get install -y dos2unix && \
apt-get install -y sed && \
apt-get install -y nano

# -----------------------------------------------
# copy all files 
# -----------------------------------------------
ADD server/bankingonapollo/ .
ADD entrypoint.sh .

# -----------------------------------------------
# list for verification
# -----------------------------------------------
RUN ls 

# -----------------------------------------------
# Install NPM modules
# -----------------------------------------------
RUN npm install --${BUILD_ENV} > /dev/null

# -----------------------------------------------
# expose port
# -----------------------------------------------
EXPOSE 4000

# -----------------------------------------------
# prepare entrypoint
# -----------------------------------------------
RUN dos2unix entrypoint.sh
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
