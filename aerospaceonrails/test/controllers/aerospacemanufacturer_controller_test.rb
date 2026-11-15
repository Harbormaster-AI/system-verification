require "test_helper"

class AerospaceManufacturerControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @aerospace_manufacturer = aerospace_manufacturers(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create aerospace_manufacturer" do
    assert_difference("AerospaceManufacturer.count") do
      post aerospace_manufacturers_url, params: { aerospace_manufacturer: {
        name:"test string for name", 
legal_name:"test string for legalName", 
headquarters_country:"test string for headquartersCountry", 
website:"test string for website"
 } }
    end

    assert_redirected_to aerospace_manufacturers_url
  end

 
  
  test "should destroy aerospace_manufacturer" do
    assert_difference("AerospaceManufacturer.count", -1) do
      delete aerospace_manufacturer_url(@aerospace_manufacturer)
    end

    assert_redirected_to aerospace_manufacturers_url
  end
  
end


