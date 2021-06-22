class Users::SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :verify_authenticity_token
  
  # POST /resource/sign_in
  # def create
  #   self.resource = warden.authenticate!(auth_options)
  #   set_flash_message!(:notice, :signed_in)
  #   sign_in(resource_name, resource)
  #   yield resource if block_given?
  #   respond_with resource
  # end

  # private
  # def respond_with(resource, _opts = {})
  #   # self.resource = warden.authenticate!(auth_options)
  #   if User.where(email: "mariamsamirdawa@gmail.com").exists?
  #   # if current_user.present?
  #     # resourse=User.where(email: "mariamsamirdawa@gmail.com")
  #     # sign_in(resource_name,resource)
  #     render json: { message: 'You are logged in',user: current_user }, status: :ok
  #   else
  #     render json: {message: 'wrong credentials', error: resource.errors }, status: :unauthorized
  #   end
  

  # end

  # def respond_to_on_destroy
  #   log_out_success && return if current_user

  #   log_out_failure
  # end

  # def log_out_success
  #   render json: { message: "You are logged out." }, status: :ok
  # end

  # def log_out_failure
  #   render json: { message: "Hmm nothing happened."}, status: :unauthorized
  # end
  private

  def respond_with(resource, _opts = {})
    # user=current_user
    # avatar=""
    if current_user&.avatar&.attached?
      # session[:user_id] = current_user.id
      avatar = rails_blob_url(current_user.avatar)
    end
    # resource=avatar.merge(resource)
    render json: {
      user:resource,
      avatar: avatar
      }, status: :ok
  end

  def respond_to_on_destroy
    render json: {message: "signout success"}, status: :ok
  end
  
end