#set( $className = $classObject.getName() )
#set( $lowercaseClassName = ${Utils.camelToSnake(${className})} )
class ${className}sController < ApplicationController
  def index
    @${lowercaseClassName}s = ${className}.all
  end
 
  def find
    @${lowercaseClassName} = ${className}.find(params[:id])
  end
 
  def new
    @${lowercaseClassName} = ${className}.new
  end
 
  def edit
    @${lowercaseClassName} = ${className}.find(params[:id])
  end
 
  def create
    @${lowercaseClassName} = ${className}.new(${lowercaseClassName}_params)
 
    if @${lowercaseClassName}.save
      redirect_to ${lowercaseClassName}s_path
    else
      render 'new'
    end
  end
 
  def update
    @${lowercaseClassName} = ${className}.find(params[:id])
 
    if @${lowercaseClassName}.update(${lowercaseClassName}_params)
      redirect_to ${lowercaseClassName}s_path
    else
      render 'edit'
    end
  end
 
  def destroy
    @${lowercaseClassName} = ${className}.find(params[:id])
    @${lowercaseClassName}.destroy
    redirect_to ${lowercaseClassName}s_path
  end

 
  private
    def ${lowercaseClassName}_params
      params.require(:${lowercaseClassName}).permit(
#set( $attributes = $classObject.getAttributesOnly(false,false) )
#foreach( $attribute in $attributes )
#set( $attributeName = "${Utils.camelToSnake( $attribute.getName() )}" )
#set( $attributeName = ":${attributeName}" )
#if ( $velocityCount < attributes.size() )
#set( $attributeName = "${attributeName}," )
        $attributeName
#end
#end
      )
$generateAppStats.applyMetaDataTagWithCount( "Rest Controller Pattern", "Exposes application services through HTTP endpoints.", 8)
