class BusinessGlossaryTermsController < ApplicationController
  def index
    @business_glossary_terms = BusinessGlossaryTerm.all
  end
 
  def find
    @business_glossary_term = BusinessGlossaryTerm.find(params[:id])
  end
 
  def new
    @business_glossary_term = BusinessGlossaryTerm.new
  end
 
  def edit
    @business_glossary_term = BusinessGlossaryTerm.find(params[:id])
  end
 
  def create
    @business_glossary_term = BusinessGlossaryTerm.new(business_glossary_term_params)
 
    if @business_glossary_term.save
      redirect_to business_glossary_terms_path
    else
      render 'new'
    end
  end
 
  def update
    @business_glossary_term = BusinessGlossaryTerm.find(params[:id])
 
    if @business_glossary_term.update(business_glossary_term_params)
      redirect_to business_glossary_terms_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @business_glossary_term = BusinessGlossaryTerm.find(params[:id])
    @business_glossary_term.destroy
    redirect_to business_glossary_terms_path
  end

 
  private
    def business_glossary_term_params
      params.require(:business_glossary_term).permit(
        :term,
        :definition,
        :steward
      )

  end
end