require "test_helper"

class DataSetControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @data_set = data_sets(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create data_set" do
    assert_difference("DataSet.count") do
      post data_sets_url, params: { data_set: {
        name:"test string for name", 
schema_version:"test string for schemaVersion", 
refresh_schedule:"test value", 
sensitive:true, 
data_format:DataSet.DataFormats[0]
 } }
    end

    assert_redirected_to data_sets_url
  end

 
  
  test "should destroy data_set" do
    assert_difference("DataSet.count", -1) do
      delete data_set_url(@data_set)
    end

    assert_redirected_to data_sets_url
  end
  
end


