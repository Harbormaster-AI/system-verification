require "test_helper"

class FraudSignalControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @fraud_signal = fraud_signals(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create fraud_signal" do
    assert_difference("FraudSignal.count") do
      post fraud_signals_url, params: { fraud_signal: {
        name:"test string for name", 
rule_logic:"test string for ruleLogic", 
signal_type:FraudSignal.SignalTypes[0]
 } }
    end

    assert_redirected_to fraud_signals_url
  end

 
  
  test "should destroy fraud_signal" do
    assert_difference("FraudSignal.count", -1) do
      delete fraud_signal_url(@fraud_signal)
    end

    assert_redirected_to fraud_signals_url
  end
  
end


