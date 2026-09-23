require "test_helper"

class BankControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @bank = banks(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create bank" do
    assert_difference("Bank.count") do
      post banks_url, params: { bank: { name:"test string for name", legalName:"test string for legalName", swiftBic:"test value", headquartersCountry:"test string for headquartersCountry", website:"test string for website" } }
    end

    assert_redirected_to banks_url
  end

 
  
  test "should destroy bank" do
    assert_difference("Bank.count", -1) do
      delete bank_url(@bank)
    end

    assert_redirected_to banks_url
  end
  
end


