require "test_helper"

class CustomerControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_customer = _customers(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _customer" do
    assert_difference("Customer.count") do
      post _customers_url, params: { _customer: {
                        KycStatus:Customer.KycStatuss[0]
 } }
    end

    assert_redirected_to _customers_url
  end

 
  
  test "should destroy _customer" do
    assert_difference("Customer.count", -1) do
      delete _customer_url(@_customer)
    end

    assert_redirected_to _customers_url
  end
  
end


