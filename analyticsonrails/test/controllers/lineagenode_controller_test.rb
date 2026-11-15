require "test_helper"

class LineageNodeControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @lineage_node = lineage_nodes(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should create lineage_node" do
    assert_difference("LineageNode.count") do
      post lineage_nodes_url, params: { lineage_node: {
        name:"test string for name", 
qualified_name:"test string for qualifiedName", 
node_type:LineageNode.NodeTypes[0]
 } }
    end

    assert_redirected_to lineage_nodes_url
  end

 
  
  test "should destroy lineage_node" do
    assert_difference("LineageNode.count", -1) do
      delete lineage_node_url(@lineage_node)
    end

    assert_redirected_to lineage_nodes_url
  end
  
end


