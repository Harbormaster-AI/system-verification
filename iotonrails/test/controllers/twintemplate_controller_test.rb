require "test_helper"

class TwinTemplateControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @twinTemplate = twinTemplates(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create twinTemplate" do
    assert_difference("TwinTemplate.count") do
      post twinTemplates_url, params: { twinTemplate: { name:"test string for name", schemaUri:"test value", version:"test string for version" } }
    end

    assert_redirected_to twinTemplates_url
  end

 
  
  test "should destroy twinTemplate" do
    assert_difference("TwinTemplate.count", -1) do
      delete twinTemplate_url(@twinTemplate)
    end

    assert_redirected_to twinTemplates_url
  end
  
end


