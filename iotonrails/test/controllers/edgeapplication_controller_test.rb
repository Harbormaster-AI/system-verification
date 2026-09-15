require "test_helper"

class EdgeApplicationControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @edgeApplication = edgeApplications(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create edgeApplication" do
    assert_difference("EdgeApplication.count") do
      post edgeApplications_url, params: { edgeApplication: { name:"test string for name", version:"test string for version", image:"test string for image", Status:EdgeApplication.Statuss[0] } }
    end

    assert_redirected_to edgeApplications_url
  end

 
  
  test "should destroy edgeApplication" do
    assert_difference("EdgeApplication.count", -1) do
      delete edgeApplication_url(@edgeApplication)
    end

    assert_redirected_to edgeApplications_url
  end
  
end


