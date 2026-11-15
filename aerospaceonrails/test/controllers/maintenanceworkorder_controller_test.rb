require "test_helper"

class MaintenanceWorkOrderControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @maintenance_work_order = maintenance_work_orders(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create maintenance_work_order" do
    assert_difference("MaintenanceWorkOrder.count") do
      post maintenance_work_orders_url, params: { maintenance_work_order: {
        work_order_number:"test string for workOrderNumber", 
status:MaintenanceWorkOrder.Statuss[0]
 } }
    end

    assert_redirected_to maintenance_work_orders_url
  end

 
  
  test "should destroy maintenance_work_order" do
    assert_difference("MaintenanceWorkOrder.count", -1) do
      delete maintenance_work_order_url(@maintenance_work_order)
    end

    assert_redirected_to maintenance_work_orders_url
  end
  
end


