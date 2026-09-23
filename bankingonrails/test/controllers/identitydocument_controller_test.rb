require "test_helper"

class IdentityDocumentControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @identity_document = identity_documents(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create identity_document" do
    assert_difference("IdentityDocument.count") do
      post identity_documents_url, params: { identity_document: {
        document_type:IdentityDocument.DocumentTypes[0] } }
    end

    assert_redirected_to identity_documents_url
  end

 
  
  test "should destroy identity_document" do
    assert_difference("IdentityDocument.count", -1) do
      delete identity_document_url(@identity_document)
    end

    assert_redirected_to identity_documents_url
  end
  
end


