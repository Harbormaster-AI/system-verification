require "test_helper"

class BusinessGlossaryTermControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @business_glossary_term = business_glossary_terms(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create business_glossary_term" do
    assert_difference("BusinessGlossaryTerm.count") do
      post business_glossary_terms_url, params: { business_glossary_term: {
        term:"test string for term", 
definition:"test string for definition", 
steward:"test string for steward"
 } }
    end

    assert_redirected_to business_glossary_terms_url
  end

 
  
  test "should destroy business_glossary_term" do
    assert_difference("BusinessGlossaryTerm.count", -1) do
      delete business_glossary_term_url(@business_glossary_term)
    end

    assert_redirected_to business_glossary_terms_url
  end
  
end


