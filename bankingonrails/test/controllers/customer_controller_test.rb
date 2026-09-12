require "test_helper"

class CustomerControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @customer = customers(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create customer" do
    assert_difference("Customer.count") do
      post customers_url, params: { customer: { firstName:"test string for firstName", lastName:"test string for lastName", legalName:"test string for legalName", dateOfBirth:1.week.ago, taxId:"test string for taxId", email:"test string for email", phone:"test string for phone", address:"test value", CustomerType:Customer.CustomerTypes[0], RiskRating:Customer.RiskRatings[0], KycStatus:Customer.KycStatuss[0] } }
    end

    assert_redirected_to customers_url
  end

 
  
  test "should destroy customer" do
    assert_difference("Customer.count", -1) do
      delete customer_url(@customer)
    end

    assert_redirected_to customers_url
  end
  
end


