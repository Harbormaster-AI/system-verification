require "test_helper"

class PlantControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @plant = plants(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create plant" do
    assert_difference("Plant.count") do
      post plants_url, params: { plant: {
        name:"test string for name", 
plant_code:"test string for plantCode", 
address:"test value"
 } }
    end

    assert_redirected_to plants_url
  end

 
  
  test "should destroy plant" do
    assert_difference("Plant.count", -1) do
      delete plant_url(@plant)
    end

    assert_redirected_to plants_url
  end
  
end


