require "test_helper"

class SoftwareLoadControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @software_load = software_loads(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create software_load" do
    assert_difference("SoftwareLoad.count") do
      post software_loads_url, params: { software_load: {
        version:"test string for version", 
load_type:SoftwareLoad.LoadTypes[0]
 } }
    end

    assert_redirected_to software_loads_url
  end

 
  
  test "should destroy software_load" do
    assert_difference("SoftwareLoad.count", -1) do
      delete software_load_url(@software_load)
    end

    assert_redirected_to software_loads_url
  end
  
end


