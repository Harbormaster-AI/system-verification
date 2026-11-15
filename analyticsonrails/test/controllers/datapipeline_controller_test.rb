require "test_helper"

class DataPipelineControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @data_pipeline = data_pipelines(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create data_pipeline" do
    assert_difference("DataPipeline.count") do
      post data_pipelines_url, params: { data_pipeline: {
        name:"test string for name", 
schedule:"test value", 
trigger_type:DataPipeline.TriggerTypes[0], 
status:DataPipeline.Statuss[0]
 } }
    end

    assert_redirected_to data_pipelines_url
  end

 
  
  test "should destroy data_pipeline" do
    assert_difference("DataPipeline.count", -1) do
      delete data_pipeline_url(@data_pipeline)
    end

    assert_redirected_to data_pipelines_url
  end
  
end


