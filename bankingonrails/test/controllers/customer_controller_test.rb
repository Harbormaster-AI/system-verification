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
      post customers_url, params: { customer: {
        first_name:"test string for firstName", 
last_name:"test string for lastName", 
legal_name:"test string for legalName", 
date_of_birth:1.week.ago, 
tax_id:"test string for taxId", 
email:"test string for email", 
phone:"test string for phone", 
address:"test value", 
customer_type:Customer.CustomerTypes[0], 
risk_rating:Customer.RiskRatings[0], 
kyc_status:Customer.KycStatuss[0]
 } }
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


