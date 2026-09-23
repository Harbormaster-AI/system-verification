require "test_helper"

class BranchControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @_branch = _branchs(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create _branch" do
    assert_difference("Branch.count") do
      post _branchs_url, params: { _branch: {
                        openingHours:"test string for openingHours"
 } }
    end

    assert_redirected_to _branchs_url
  end

 
  
  test "should destroy _branch" do
    assert_difference("Branch.count", -1) do
      delete _branch_url(@_branch)
    end

    assert_redirected_to _branchs_url
  end
  
end


