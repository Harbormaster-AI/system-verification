require "test_helper"

class IdentityDocumentControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @identityDocument = identityDocuments(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create identityDocument" do
    assert_difference("IdentityDocument.count") do
      post identityDocuments_url, params: { identityDocument: { documentNumber:"test string for documentNumber", issuingCountry:"test string for issuingCountry", expirationDate:1.week.ago, DocumentType:IdentityDocument.DocumentTypes[0] } }
    end

    assert_redirected_to identityDocuments_url
  end

 
  
  test "should destroy identityDocument" do
    assert_difference("IdentityDocument.count", -1) do
      delete identityDocument_url(@identityDocument)
    end

    assert_redirected_to identityDocuments_url
  end
  
end


