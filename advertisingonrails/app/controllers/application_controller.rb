class ApplicationController < ActionController::Base
    def health
        render plain: "Ruby on Rails application advertisingonrails is running", status: :ok
    end
end