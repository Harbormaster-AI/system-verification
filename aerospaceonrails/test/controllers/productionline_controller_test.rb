require "test_helper"

class ProductionLineControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @production_line = production_lines(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create production_line" do
    assert_difference("ProductionLine.count") do
      post production_lines_url, params: { production_line: {
        name:"test string for name", 
line_type:ProductionLine.LineTypes[0]
 } }
    end

    assert_redirected_to production_lines_url
  end

 
  
  test "should destroy production_line" do
    assert_difference("ProductionLine.count", -1) do
      delete production_line_url(@production_line)
    end

    assert_redirected_to production_lines_url
  end
  
end


