require "test_helper"

class BankingProductControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_banking_product = _banking_products(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _banking_product" do
    assert_difference("BankingProduct.count") do
      post _banking_products_url, params: { _banking_product: {
                        ProductCategory:BankingProduct.ProductCategorys[0]
 } }
    end

    assert_redirected_to _banking_products_url
  end

 
  
  test "should destroy _banking_product" do
    assert_difference("BankingProduct.count", -1) do
      delete _banking_product_url(@_banking_product)
    end

    assert_redirected_to _banking_products_url
  end
  
end


