class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  skip_before_action :verify_authenticity_token

  def create
   
    # build_resource(registration_params)
    resource=User.new(name: registration_params[:name],
                  username: registration_params[:username],
                  email: registration_params[:email] ,
                  password: registration_params[:password],
                  password_confirmation: registration_params[:password_confirmation] ,
                  bio: registration_params[:bio],
                  dob: registration_params[:dob] )
    # if resource.persisted?
    if resource.save
      if params[:avatar]
        resource.avatar.attach(registration_params[:avatar])
      end
      sign_up(resource_name, resource)
      register_success
    else
      register_failed(resource)
    end
    # respond_with resource
  end  

  private

  def registration_params
    params.permit(:email, :name, :bio, :dob, 
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
        details: resource.errors,
        code: '100'
      }
    ]
  }, status: :ok
  end
end