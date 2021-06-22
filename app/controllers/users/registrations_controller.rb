class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  skip_before_action :verify_authenticity_token

  def create
    build_resource(registration_params)
    resource.save
    sign_up(resource_name, resource)
    respond_with resource
  end  

  private

  def registration_params
    params.require(:user).permit(:email, :name, :bio, :dob, 
      :username, :password, :password_confirmation, :avatar)
  end
  

  def respond_with(resource, _opts = {})
    register_success && return if resource.persisted?

    register_failed(resource)
  end

  def register_success
    avatar=""
    if current_user&.avatar&.attached?
      avatar = rails_blob_url(current_user.avatar)
    end
    render json: { message: 'Register success' ,
      user: current_user,
      avatar: avatar
      }, status: :ok
  end

  def register_failed(resource)
    render json: { message: "Something went wrong", errors: [
      {
        status: '400',
        title: 'Bad Request',
        detail: resource.errors,
        code: '100'
      }
    ]
  }, status: :bad_request
  end
end