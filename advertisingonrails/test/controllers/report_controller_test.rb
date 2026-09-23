require "test_helper"

class ReportControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @report = reports(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create report" do
    assert_difference("Report.count") do
      post reports_url, params: { report: { reportName:"test string for reportName", generatedAt:1.week.ago, fileUrl:"test value", ReportType:Report.ReportTypes[0] } }
    end

    assert_redirected_to reports_url
  end

 
  
  test "should destroy report" do
    assert_difference("Report.count", -1) do
      delete report_url(@report)
    end

    assert_redirected_to reports_url
  end
  
end


