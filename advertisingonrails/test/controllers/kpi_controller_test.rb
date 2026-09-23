require "test_helper"

class KPIControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @kPI = kPIs(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create kPI" do
    assert_difference("KPI.count") do
      post kPIs_url, params: { kPI: { targetValue:"test value", MetricType:KPI.MetricTypes[0] } }
    end

    assert_redirected_to kPIs_url
  end

 
  
  test "should destroy kPI" do
    assert_difference("KPI.count", -1) do
      delete kPI_url(@kPI)
    end

    assert_redirected_to kPIs_url
  end
  
end


