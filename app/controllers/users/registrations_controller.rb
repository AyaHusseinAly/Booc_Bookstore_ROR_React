class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  skip_before_action :verify_authenticity_token

  def create
    build_resource(registration_params)
    resource.save
    respond_with resource
  end  

  private

  def registration_params
    params.require(:user).permit(:email, :name, :bio, :dob, 
      :username, :password, :password_confirmation)
  end
  

  def respond_with(resource, _opts = {})
    register_success && return if resource.persisted?

    register_failed
  end

  def register_success
    render json: { message: I18n.t('controllers.registrations.confirm'),user: current_user }
  end

  def register_failed
    render json: { message: "Something went wrong." }
  end
end