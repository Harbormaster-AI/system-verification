FROM ruby:3.4-slim

WORKDIR /app


RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       pkg-config \
       libyaml-dev \
       libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 5432

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]