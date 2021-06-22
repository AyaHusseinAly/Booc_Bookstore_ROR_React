class ApplicationController < ActionController::Base
    
    # before_action :configure_permitted_parameters, if: :devise_controller?

    # protected
    # # def current_token
    # #     requesn.env['warden-jwt_auth.token']
    # # end
    # def configure_permitted_parameters
    #     devise_parameter_sanitizer.permit(:sign_in, keys: [:login])
    #     devise_parameter_sanitizer.permit(:sign_up, keys: [:username,:email,:bio,:name,:dob,:password,:password_confirmation])
    # end

    protect_from_forgery with: :null_session

end
