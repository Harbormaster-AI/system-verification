require_relative "boot"

require "rails/all"

Bundler.require(*Rails.groups)

module Bankingonrails
  class Application < Rails::Application
    config.load_defaults 8.1

    config.autoload_lib(ignore: %w[assets tasks])

    config.database_name     = "testDb"
    config.database_username = "postgres"
    config.database_password = "postgres"
    config.database_host     = "localhost"
    config.database_port     = 5432

  end
end