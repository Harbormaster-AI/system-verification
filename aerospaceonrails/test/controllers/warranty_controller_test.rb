require "test_helper"

class WarrantyControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @warranty = warrantys(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create warranty" do
    assert_difference("Warranty.count") do
      post warrantys_url, params: { warranty: {
        coverage_months:100, 
warranty_type:Warranty.WarrantyTypes[0]
 } }
    end

    assert_redirected_to warrantys_url
  end

 
  
  test "should destroy warranty" do
    assert_difference("Warranty.count", -1) do
      delete warranty_url(@warranty)
    end

    assert_redirected_to warrantys_url
  end
  
end


