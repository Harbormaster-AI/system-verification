require "test_helper"

class CreativeFileControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @creativeFile = creativeFiles(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create creativeFile" do
    assert_difference("CreativeFile.count") do
      post creativeFiles_url, params: { creativeFile: { uri:"test value", fileSizeKB:100, mimeType:"test string for mimeType", checksum:"test string for checksum" } }
    end

    assert_redirected_to creativeFiles_url
  end

 
  
  test "should destroy creativeFile" do
    assert_difference("CreativeFile.count", -1) do
      delete creativeFile_url(@creativeFile)
    end

    assert_redirected_to creativeFiles_url
  end
  
end


