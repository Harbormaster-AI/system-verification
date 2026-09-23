require "test_helper"

class ExperimentControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @experiment = experiments(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create experiment" do
    assert_difference("Experiment.count") do
      post experiments_url, params: { experiment: { name:"test string for name", hypothesis:"test string for hypothesis", startDate:1.week.ago, endDate:1.week.ago, Status:Experiment.Statuss[0] } }
    end

    assert_redirected_to experiments_url
  end

 
  
  test "should destroy experiment" do
    assert_difference("Experiment.count", -1) do
      delete experiment_url(@experiment)
    end

    assert_redirected_to experiments_url
  end
  
end


