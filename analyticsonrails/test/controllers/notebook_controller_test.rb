require "test_helper"

class NotebookControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @notebook = notebooks(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create notebook" do
    assert_difference("Notebook.count") do
      post notebooks_url, params: { notebook: {
        title:"test string for title", 
repository:"test value", 
language:Notebook.Languages[0]
 } }
    end

    assert_redirected_to notebooks_url
  end

 
  
  test "should destroy notebook" do
    assert_difference("Notebook.count", -1) do
      delete notebook_url(@notebook)
    end

    assert_redirected_to notebooks_url
  end
  
end


