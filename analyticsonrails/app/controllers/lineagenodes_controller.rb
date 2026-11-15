class LineageNodesController < ApplicationController
  def index
    @lineage_nodes = LineageNode.all
  end
 
  def find
    @lineage_node = LineageNode.find(params[:id])
  end
 
  def new
    @lineage_node = LineageNode.new
  end
 
  def edit
    @lineage_node = LineageNode.find(params[:id])
  end
 
  def create
    @lineage_node = LineageNode.new(lineage_node_params)
 
    if @lineage_node.save
      redirect_to lineage_nodes_path
    else
      render 'new'
    end
  end
 
  def update
    @lineage_node = LineageNode.find(params[:id])
 
    if @lineage_node.update(lineage_node_params)
      redirect_to lineage_nodes_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @lineage_node = LineageNode.find(params[:id])
    @lineage_node.destroy
    redirect_to lineage_nodes_path
  end

 
  private
    def lineage_node_params
      params.require(:lineage_node).permit(
        :name,
        :qualified_name,
        :node_type
      )

  end
end