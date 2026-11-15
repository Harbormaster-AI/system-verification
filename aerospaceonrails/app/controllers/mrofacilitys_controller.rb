class MROFacilitysController < ApplicationController
  def index
    @m_r_o_facilitys = MROFacility.all
  end
 
  def find
    @m_r_o_facility = MROFacility.find(params[:id])
  end
 
  def new
    @m_r_o_facility = MROFacility.new
  end
 
  def edit
    @m_r_o_facility = MROFacility.find(params[:id])
  end
 
  def create
    @m_r_o_facility = MROFacility.new(m_r_o_facility_params)
 
    if @m_r_o_facility.save
      redirect_to m_r_o_facilitys_path
    else
      render 'new'
    end
  end
 
  def update
    @m_r_o_facility = MROFacility.find(params[:id])
 
    if @m_r_o_facility.update(m_r_o_facility_params)
      redirect_to m_r_o_facilitys_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @m_r_o_facility = MROFacility.find(params[:id])
    @m_r_o_facility.destroy
    redirect_to m_r_o_facilitys_path
  end

 
  private
    def m_r_o_facility_params
      params.require(:m_r_o_facility).permit(
        :name,
        :approval_scope,
        :address
      )

  end
end