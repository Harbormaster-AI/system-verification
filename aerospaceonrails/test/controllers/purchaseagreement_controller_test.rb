require "test_helper"

class PurchaseAgreementControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @purchase_agreement = purchase_agreements(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create purchase_agreement" do
    assert_difference("PurchaseAgreement.count") do
      post purchase_agreements_url, params: { purchase_agreement: {
        agreement_number:"test string for agreementNumber", 
effective_date:1.week.ago
 } }
    end

    assert_redirected_to purchase_agreements_url
  end

 
  
  test "should destroy purchase_agreement" do
    assert_difference("PurchaseAgreement.count", -1) do
      delete purchase_agreement_url(@purchase_agreement)
    end

    assert_redirected_to purchase_agreements_url
  end
  
end


