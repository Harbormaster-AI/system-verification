require "test_helper"

class PredictionControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @prediction = predictions(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create prediction" do
    assert_difference("Prediction.count") do
      post predictions_url, params: { prediction: {
        reference_key:"test string for referenceKey", 
predicted_at:1.week.ago, 
score:"test value"
 } }
    end

    assert_redirected_to predictions_url
  end

 
  
  test "should destroy prediction" do
    assert_difference("Prediction.count", -1) do
      delete prediction_url(@prediction)
    end

    assert_redirected_to predictions_url
  end
  
end


