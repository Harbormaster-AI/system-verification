require "test_helper"

class FirmwareReleaseControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @firmwareRelease = firmwareReleases(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create firmwareRelease" do
    assert_difference("FirmwareRelease.count") do
      post firmwareReleases_url, params: { firmwareRelease: { version:"test value", releaseDate:1.week.ago, releaseNotes:"test string for releaseNotes", checksum:"test value" } }
    end

    assert_redirected_to firmwareReleases_url
  end

 
  
  test "should destroy firmwareRelease" do
    assert_difference("FirmwareRelease.count", -1) do
      delete firmwareRelease_url(@firmwareRelease)
    end

    assert_redirected_to firmwareReleases_url
  end
  
end


