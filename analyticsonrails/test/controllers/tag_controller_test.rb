require "test_helper"

class TagControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @tag = tags(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create tag" do
    assert_difference("Tag.count") do
      post tags_url, params: { tag: {
        name:"test string for name", 
category:Tag.Categorys[0]
 } }
    end

    assert_redirected_to tags_url
  end

 
  
  test "should destroy tag" do
    assert_difference("Tag.count", -1) do
      delete tag_url(@tag)
    end

    assert_redirected_to tags_url
  end
  
end


