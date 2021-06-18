class UsersController < ApplicationController

    #checks if the username or email the user provides in registeration already exists
    def available
        free= if params[:email].present?
            !User.where(email: params[:email].downcase).exists?
        elsif params[:username].present?
            !User.where(username: params[:username].downcase).exists?
        else
            true
        end
        render json: {data: free}
    end

end
