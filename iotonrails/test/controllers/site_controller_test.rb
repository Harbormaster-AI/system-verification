require "test_helper"

class SiteControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @site = sites(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create site" do
    assert_difference("Site.count") do
      post sites_url, params: { site: { name:"test string for name", address:"test value", timezone:"test string for timezone", latitude:"test value", longitude:"test value" } }
    end

    assert_redirected_to sites_url
  end

 
  
  test "should destroy site" do
    assert_difference("Site.count", -1) do
      delete site_url(@site)
    end

    assert_redirected_to sites_url
  end
  
end


