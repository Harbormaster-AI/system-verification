require "test_helper"

class VisualizationControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @visualization = visualizations(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create visualization" do
    assert_difference("Visualization.count") do
      post visualizations_url, params: { visualization: {
        title:"test string for title", 
options:"test value", 
chart_type:Visualization.ChartTypes[0]
 } }
    end

    assert_redirected_to visualizations_url
  end

 
  
  test "should destroy visualization" do
    assert_difference("Visualization.count", -1) do
      delete visualization_url(@visualization)
    end

    assert_redirected_to visualizations_url
  end
  
end


