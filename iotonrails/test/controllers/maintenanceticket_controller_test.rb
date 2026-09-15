require "test_helper"

class MaintenanceTicketControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @maintenanceTicket = maintenanceTickets(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create maintenanceTicket" do
    assert_difference("MaintenanceTicket.count") do
      post maintenanceTickets_url, params: { maintenanceTicket: { ticketNumber:"test string for ticketNumber", openedAt:1.week.ago, closedAt:1.week.ago, Priority:MaintenanceTicket.Prioritys[0], Status:MaintenanceTicket.Statuss[0] } }
    end

    assert_redirected_to maintenanceTickets_url
  end

 
  
  test "should destroy maintenanceTicket" do
    assert_difference("MaintenanceTicket.count", -1) do
      delete maintenanceTicket_url(@maintenanceTicket)
    end

    assert_redirected_to maintenanceTickets_url
  end
  
end


