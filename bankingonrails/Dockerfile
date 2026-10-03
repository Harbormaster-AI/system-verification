FROM ruby:2.7.1
LABEL org.opencontainers.image.vendor="Harbormaster"
LABEL org.opencontainers.image.title="bankingonrails"
LABEL org.opencontainers.image.version="0.0.1"
LABEL com.harbormaster.blueprint="RubyonRails"
LABEL com.harbormaster.model="Banking Industry Domain Model"
LABEL com.harbormaster.generated="2026-10-02"
#LABEL com.harbormaster.certification="aadbf624-a4d4-4571-b48a-c68310a403e9"
RUN cat /etc/os-release

RUN apt-get update && \
        apt-get install -y --no-install-recommends \
            build-essential \
            libcurl4-openssl-dev \
            libxml2-dev \
            libsqlite3-dev \
            libpq-dev \
            libmysqlclient21 \
            npm \
            postgresql-client \
            sqlite3 && \
        apt-get clean && \
        rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*fs

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
