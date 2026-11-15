require "test_helper"

class AccessPolicyControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @access_policy = access_policys(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create access_policy" do
    assert_difference("AccessPolicy.count") do
      post access_policys_url, params: { access_policy: {
        name:"test string for name", 
subject_name:"test string for subjectName", 
access_level:AccessPolicy.AccessLevels[0], 
subject_type:AccessPolicy.SubjectTypes[0]
 } }
    end

    assert_redirected_to access_policys_url
  end

 
  
  test "should destroy access_policy" do
    assert_difference("AccessPolicy.count", -1) do
      delete access_policy_url(@access_policy)
    end

    assert_redirected_to access_policys_url
  end
  
end


