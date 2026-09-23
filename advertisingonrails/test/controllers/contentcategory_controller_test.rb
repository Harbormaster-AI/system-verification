require "test_helper"

class ContentCategoryControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @contentCategory = contentCategorys(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create contentCategory" do
    assert_difference("ContentCategory.count") do
      post contentCategorys_url, params: { contentCategory: { code:"test string for code", name:"test string for name" } }
    end

    assert_redirected_to contentCategorys_url
  end

 
  
  test "should destroy contentCategory" do
    assert_difference("ContentCategory.count", -1) do
      delete contentCategory_url(@contentCategory)
    end

    assert_redirected_to contentCategorys_url
  end
  
end


