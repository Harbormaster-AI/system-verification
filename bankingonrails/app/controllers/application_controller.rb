class ApplicationController < ActionController::Base
    def health
        render plain: "Ruby on Rails application bankingonrails is running", status: :ok
    end
end