require "test_helper"

class TypeCertificateControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @type_certificate = type_certificates(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create type_certificate" do
    assert_difference("TypeCertificate.count") do
      post type_certificates_url, params: { type_certificate: {
        certificate_number:"test string for certificateNumber", 
authority:"test string for authority"
 } }
    end

    assert_redirected_to type_certificates_url
  end

 
  
  test "should destroy type_certificate" do
    assert_difference("TypeCertificate.count", -1) do
      delete type_certificate_url(@type_certificate)
    end

    assert_redirected_to type_certificates_url
  end
  
end


