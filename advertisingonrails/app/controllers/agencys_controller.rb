
class AgencysController < ApplicationController
  def index
    @agencys = Agency.all
  end
 
  def find
    @agency = Agency.find(params[:id])
  end
 
  def new
    @agency = Agency.new
  end
 
  def edit
    @agency = Agency.find(params[:id])
  end
 
  def create
    @agency = Agency.new(agency_params)
 
    if @agency.save
      redirect_to agencys_path
    else
      render 'new'
    end
  end
 
  def update
    @agency = Agency.find(params[:id])
 
    if @agency.update(agency_params)
      redirect_to agencys_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @agency = Agency.find(params[:id])
    @agency.destroy
    redirect_to agencys_path
  end

 
  private
    def agency_params
      params.require(:agency).permit(:name, :legalName, :headquartersCountry, :website)
    end
end