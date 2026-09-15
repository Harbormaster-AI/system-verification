require "test_helper"

class HardwareModuleControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @hardwareModule = hardwareModules(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create hardwareModule" do
    assert_difference("HardwareModule.count") do
      post hardwareModules_url, params: { hardwareModule: { moduleCode:"test string for moduleCode", datasheetUri:"test value", ModuleType:HardwareModule.ModuleTypes[0] } }
    end

    assert_redirected_to hardwareModules_url
  end

 
  
  test "should destroy hardwareModule" do
    assert_difference("HardwareModule.count", -1) do
      delete hardwareModule_url(@hardwareModule)
    end

    assert_redirected_to hardwareModules_url
  end
  
end


