require "test_helper"

class MaintenanceAppointmentControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @maintenance_appointment = maintenance_appointments(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create maintenance_appointment" do
    assert_difference("MaintenanceAppointment.count") do
      post maintenance_appointments_url, params: { maintenance_appointment: {
        appointment_date:1.week.ago, 
status:MaintenanceAppointment.Statuss[0]
 } }
    end

    assert_redirected_to maintenance_appointments_url
  end

 
  
  test "should destroy maintenance_appointment" do
    assert_difference("MaintenanceAppointment.count", -1) do
      delete maintenance_appointment_url(@maintenance_appointment)
    end

    assert_redirected_to maintenance_appointments_url
  end
  
end


