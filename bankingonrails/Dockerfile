FROM ruby:3.4.5-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        default-libmysqlclient-dev \
        libcurl4-openssl-dev \
        libxml2-dev \
        libsqlite3-dev \
        libpq-dev \
        npm \
        postgresql-client \
        sqlite3 && \
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
