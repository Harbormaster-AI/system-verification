require "test_helper"

class DeviceCertificateControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @deviceCertificate = deviceCertificates(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create deviceCertificate" do
    assert_difference("DeviceCertificate.count") do
      post deviceCertificates_url, params: { deviceCertificate: { serialNumber:"test string for serialNumber", notBefore:1.week.ago, notAfter:1.week.ago, fingerprint:"test string for fingerprint", CertificateType:DeviceCertificate.CertificateTypes[0] } }
    end

    assert_redirected_to deviceCertificates_url
  end

 
  
  test "should destroy deviceCertificate" do
    assert_difference("DeviceCertificate.count", -1) do
      delete deviceCertificate_url(@deviceCertificate)
    end

    assert_redirected_to deviceCertificates_url
  end
  
end


