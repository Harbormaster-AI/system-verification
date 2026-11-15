require "test_helper"

class MROFacilityControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @m_r_o_facility = m_r_o_facilitys(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create m_r_o_facility" do
    assert_difference("MROFacility.count") do
      post m_r_o_facilitys_url, params: { m_r_o_facility: {
        name:"test string for name", 
approval_scope:"test string for approvalScope", 
address:"test value"
 } }
    end

    assert_redirected_to m_r_o_facilitys_url
  end

 
  
  test "should destroy m_r_o_facility" do
    assert_difference("MROFacility.count", -1) do
      delete m_r_o_facility_url(@m_r_o_facility)
    end

    assert_redirected_to m_r_o_facilitys_url
  end
  
end


