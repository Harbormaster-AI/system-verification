require "test_helper"

class ProductionCertificateControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @production_certificate = production_certificates(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create production_certificate" do
    assert_difference("ProductionCertificate.count") do
      post production_certificates_url, params: { production_certificate: {
        certificate_number:"test string for certificateNumber", 
authority:"test string for authority"
 } }
    end

    assert_redirected_to production_certificates_url
  end

 
  
  test "should destroy production_certificate" do
    assert_difference("ProductionCertificate.count", -1) do
      delete production_certificate_url(@production_certificate)
    end

    assert_redirected_to production_certificates_url
  end
  
end


