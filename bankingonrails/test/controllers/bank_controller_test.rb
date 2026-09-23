require "test_helper"

class BankControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_bank = _banks(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _bank" do
    assert_difference("Bank.count") do
      post _banks_url, params: { _bank: {
                        website:"test string for website"
 } }
    end

    assert_redirected_to _banks_url
  end

 
  
  test "should destroy _bank" do
    assert_difference("Bank.count", -1) do
      delete _bank_url(@_bank)
    end

    assert_redirected_to _banks_url
  end
  
end


