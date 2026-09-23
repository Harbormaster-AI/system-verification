require "test_helper"

class BranchControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @branch = branchs(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create branch" do
    assert_difference("Branch.count") do
      post branchs_url, params: { branch: { name:"test string for name", branchCode:"test string for branchCode", address:"test value", phone:"test string for phone", openingHours:"test string for openingHours" } }
    end

    assert_redirected_to branchs_url
  end

 
  
  test "should destroy branch" do
    assert_difference("Branch.count", -1) do
      delete branch_url(@branch)
    end

    assert_redirected_to branchs_url
  end
  
end


