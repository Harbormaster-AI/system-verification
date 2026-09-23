require "test_helper"

class IdentityDocumentControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_identity_document = _identity_documents(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _identity_document" do
    assert_difference("IdentityDocument.count") do
      post _identity_documents_url, params: { _identity_document: {
                        DocumentType:IdentityDocument.DocumentTypes[0]
 } }
    end

    assert_redirected_to _identity_documents_url
  end

 
  
  test "should destroy _identity_document" do
    assert_difference("IdentityDocument.count", -1) do
      delete _identity_document_url(@_identity_document)
    end

    assert_redirected_to _identity_documents_url
  end
  
end


