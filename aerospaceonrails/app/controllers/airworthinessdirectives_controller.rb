class AirworthinessDirectivesController < ApplicationController
  def index
    @airworthiness_directives = AirworthinessDirective.all
  end
 
  def find
    @airworthiness_directive = AirworthinessDirective.find(params[:id])
  end
 
  def new
    @airworthiness_directive = AirworthinessDirective.new
  end
 
  def edit
    @airworthiness_directive = AirworthinessDirective.find(params[:id])
  end
 
  def create
    @airworthiness_directive = AirworthinessDirective.new(airworthiness_directive_params)
 
    if @airworthiness_directive.save
      redirect_to airworthiness_directives_path
    else
      render 'new'
    end
  end
 
  def update
    @airworthiness_directive = AirworthinessDirective.find(params[:id])
 
    if @airworthiness_directive.update(airworthiness_directive_params)
      redirect_to airworthiness_directives_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @airworthiness_directive = AirworthinessDirective.find(params[:id])
    @airworthiness_directive.destroy
    redirect_to airworthiness_directives_path
  end

 
  private
    def airworthiness_directive_params
      params.require(:airworthiness_directive).permit(
        :directive_number,
        :title
      )

  end
end