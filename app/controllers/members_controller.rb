class MembersController < ApplicationController
  def is_logged_in?
    user=User.find(params[:member][:id])
    avatar=""
    if user&.avatar&.attached?
      avatar = rails_blob_url(user.avatar)
    end
    render json:{
      user: user,
      avatar: avatar,
      logged_in: true
    }
    # if current_user
    #   render json: {
    #     logged_in: true,
    #     user: current_user
    #   }
    # else
    #   render json: {
    #     logged_in: false,
    #     message: 'no such user'
    #   }
    # end
end
  
    def show
      render json: { message: "If you see this, you're in!",user:current_user }
    end
    def avatar
      if current_user&.avatar&.attached?
        render json: {avatar:rails_blob_url(current_user.avatar)}
      else
        head :not_found
      end
    end
  end
  