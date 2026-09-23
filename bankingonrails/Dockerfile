FROM ruby:3.4.5-slim

WORKDIR /app


RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       pkg-config \
       libyaml-dev \
       libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY . .

ENV BUNDLE_PATH=vendor/bundle

RUN echo "=== BUNDLE CONFIG ===" \
    && cat .bundle/config \
    && echo "=== VENDOR BUNDLE ===" \
    && ls -la vendor/bundle/ruby/3.4.0 \
    && echo "=== RAILS GEM ===" \
    && ls -d vendor/bundle/ruby/3.4.0/gems/rails-* \
    && echo "=== RUBY ===" \
    && ruby --version \
    && echo "=== GEM HOME ===" \
    && gem env home \
    && echo "=== BUNDLE PATH ===" \
    && bundle config get path

EXPOSE 5432

CMD ["ruby", "bin/rails", "server", "--binding=0.0.0.0"]