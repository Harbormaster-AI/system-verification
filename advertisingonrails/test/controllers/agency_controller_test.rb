require "test_helper"

class AgencyControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @agency = agencys(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create agency" do
    assert_difference("Agency.count") do
      post agencys_url, params: { agency: { name:"test string for name", legalName:"test string for legalName", headquartersCountry:"test string for headquartersCountry", website:"test string for website" } }
    end

    assert_redirected_to agencys_url
  end

 
  
  test "should destroy agency" do
    assert_difference("Agency.count", -1) do
      delete agency_url(@agency)
    end

    assert_redirected_to agencys_url
  end
  
end


