class AccountStatementsController < ApplicationController
  def index
    @accountStatements = AccountStatement.all
  end
 
  def show
    @accountStatement = AccountStatement.find(params[:id])
  end
 
  def new
    @accountStatement = AccountStatement.new
  end
 
  def edit
    @accountStatement = AccountStatement.find(params[:id])
  end
 
  def create
    @accountStatement = AccountStatement.new(accountStatement_params)
 
    if @accountStatement.save
      redirect_to accountStatements_path
    else
      render 'new'
    end
  end
 
  def update
    @accountStatement = AccountStatement.find(params[:id])
 
    if @accountStatement.update(accountStatement_params)
      redirect_to accountStatements_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @accountStatement = AccountStatement.find(params[:id])
    @accountStatement.destroy
    redirect_to accountStatements_path
  end

 
  private
    def accountStatement_params
      params.require(:accountStatement).permit(:statementNumber, :periodStart, :periodEnd, :openingBalance, :closingBalance, :DeliveryMethod)
    end
end