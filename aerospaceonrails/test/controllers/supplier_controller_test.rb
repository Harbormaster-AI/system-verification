require "test_helper"

class SupplierControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @supplier = suppliers(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create supplier" do
    assert_difference("Supplier.count") do
      post suppliers_url, params: { supplier: {
        name:"test string for name", 
supplier_type:Supplier.SupplierTypes[0], 
approval_status:Supplier.ApprovalStatuss[0]
 } }
    end

    assert_redirected_to suppliers_url
  end

 
  
  test "should destroy supplier" do
    assert_difference("Supplier.count", -1) do
      delete supplier_url(@supplier)
    end

    assert_redirected_to suppliers_url
  end
  
end


