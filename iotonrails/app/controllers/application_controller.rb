class ApplicationController < ActionController::Base
    def health
        render plain: "Ruby on Rails application iotonrails is running", status: :ok
    end
end