require "test_helper"

class AircraftProgramControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @aircraft_program = aircraft_programs(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create aircraft_program" do
    assert_difference("AircraftProgram.count") do
      post aircraft_programs_url, params: { aircraft_program: {
        name:"test string for name", 
program_code:"test string for programCode", 
entry_into_service_year:100, 
status:AircraftProgram.Statuss[0]
 } }
    end

    assert_redirected_to aircraft_programs_url
  end

 
  
  test "should destroy aircraft_program" do
    assert_difference("AircraftProgram.count", -1) do
      delete aircraft_program_url(@aircraft_program)
    end

    assert_redirected_to aircraft_programs_url
  end
  
end


