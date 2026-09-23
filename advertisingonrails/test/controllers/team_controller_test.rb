require "test_helper"

class TeamControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @team = teams(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create team" do
    assert_difference("Team.count") do
      post teams_url, params: { team: { name:"test string for name" } }
    end

    assert_redirected_to teams_url
  end

 
  
  test "should destroy team" do
    assert_difference("Team.count", -1) do
      delete team_url(@team)
    end

    assert_redirected_to teams_url
  end
  
end


