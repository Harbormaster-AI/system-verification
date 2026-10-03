FROM ruby:3.4.5-slim
LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="bankingonrails"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="RubyonRails"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-10-03"
#LABEL com.harbormaster.certification="3f50ad3f-b795-41e2-a2cf-cb88bfa7ed94"
RUN cat /etc/os-release

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        wget \
        gnupg \
        build-essential \
        libcurl4-openssl-dev \
        libxml2-dev \
        libsqlite3-dev \
        libpq-dev \
        npm \
        postgresql-client \
        sqlite3 && \
    wget -q https://repo.mysql.com/apt/debian/pool/mysql-apt-config/m/mysql-apt-config/mysql-apt-config_0.8.40-1_all.deb \
        -O /tmp/mysql-apt-config.deb && \
    DEBIAN_FRONTEND=noninteractive dpkg -i /tmp/mysql-apt-config.deb && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
        libmysqlclient21 \
        default-libmysqlclient-dev && \
    rm -f /tmp/mysql-apt-config.deb && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ENV APP_PATH /usr/src/app/

RUN mkdir -p $APP_PATH

ADD ./bankingonrails $APP_PATH

WORKDIR $APP_PATH

RUN ls

RUN bundle install

ENV RAILS_ENV development
RUN npm install --global yarn
RUN rake webpacker:compile

RUN rake db:migrate 
RUN rake db:seed

EXPOSE 3000 8080

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
