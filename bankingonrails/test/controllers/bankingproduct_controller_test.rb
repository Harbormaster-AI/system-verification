require "test_helper"

class BankingProductControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @bankingProduct = bankingProducts(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create bankingProduct" do
    assert_difference("BankingProduct.count") do
      post bankingProducts_url, params: { bankingProduct: { productCode:"test string for productCode", name:"test string for name", description:"test string for description", ProductCategory:BankingProduct.ProductCategorys[0] } }
    end

    assert_redirected_to bankingProducts_url
  end

 
  
  test "should destroy bankingProduct" do
    assert_difference("BankingProduct.count", -1) do
      delete bankingProduct_url(@bankingProduct)
    end

    assert_redirected_to bankingProducts_url
  end
  
end


