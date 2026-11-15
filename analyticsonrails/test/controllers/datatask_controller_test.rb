require "test_helper"

class DataTaskControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @data_task = data_tasks(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create data_task" do
    assert_difference("DataTask.count") do
      post data_tasks_url, params: { data_task: {
        name:"test string for name", 
command:"test string for command", 
retries:100, 
task_type:DataTask.TaskTypes[0]
 } }
    end

    assert_redirected_to data_tasks_url
  end

 
  
  test "should destroy data_task" do
    assert_difference("DataTask.count", -1) do
      delete data_task_url(@data_task)
    end

    assert_redirected_to data_tasks_url
  end
  
end


