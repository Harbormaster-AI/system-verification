class ApplicationController < ActionController::Base
    def health
        render plain: "Ruby on Rails application aerospaceonrails is running", status: :ok
    end
end