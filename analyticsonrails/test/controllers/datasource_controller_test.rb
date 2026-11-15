require "test_helper"

class DataSourceControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @data_source = data_sources(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create data_source" do
    assert_difference("DataSource.count") do
      post data_sources_url, params: { data_source: {
        name:"test string for name", 
connection:"test value", 
streaming:true, 
source_type:DataSource.SourceTypes[0], 
format:DataSource.Formats[0]
 } }
    end

    assert_redirected_to data_sources_url
  end

 
  
  test "should destroy data_source" do
    assert_difference("DataSource.count", -1) do
      delete data_source_url(@data_source)
    end

    assert_redirected_to data_sources_url
  end
  
end


