require "test_helper"

class UserControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @user = users(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create user" do
    assert_difference("User.count") do
      post users_url, params: { user: { firstName:"test string for firstName", lastName:"test string for lastName", email:"test value", Role:User.Roles[0] } }
    end

    assert_redirected_to users_url
  end

 
  
  test "should destroy user" do
    assert_difference("User.count", -1) do
      delete user_url(@user)
    end

    assert_redirected_to users_url
  end
  
end


