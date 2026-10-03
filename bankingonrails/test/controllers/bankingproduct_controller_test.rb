require "test_helper"

class BankingProductControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @banking_product = banking_products(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create banking_product" do
    assert_difference("BankingProduct.count") do
      post banking_products_url, params: { banking_product: {
        product_code: "test string for productCode",
        name: "test string for name",
        description: "test string for description",
        product_category: BankingProduct.ProductCategorys[0]
      } }
    end

    assert_redirected_to banking_products_url
  end

  test "should destroy banking_product" do
    assert_difference("BankingProduct.count", -1) do
      delete banking_product_url(@banking_product)
    end

    assert_redirected_to banking_products_url
  end
end
