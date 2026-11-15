require "test_helper"

class TrainingRunControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @training_run = training_runs(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create training_run" do
    assert_difference("TrainingRun.count") do
      post training_runs_url, params: { training_run: {
        run_label:"test string for runLabel", 
started_at:1.week.ago, 
completed_at:1.week.ago, 
status:TrainingRun.Statuss[0]
 } }
    end

    assert_redirected_to training_runs_url
  end

 
  
  test "should destroy training_run" do
    assert_difference("TrainingRun.count", -1) do
      delete training_run_url(@training_run)
    end

    assert_redirected_to training_runs_url
  end
  
end


