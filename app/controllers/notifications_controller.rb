class NotificationsController < ApplicationController
    def create
        @notification = Notification.new notification_params
        if @notification.save
            ActionCable.server.broadcast "notification_channel", {data: @notification}
            flash[:success] = "new notification sent"
            render json: { message: 'sent' ,
                notification: @notification
                }, status: :ok
            
        else
            flash.now["danger"] = "error happened"
            render json: { message: 'error' }, status: :bad_request
        end
    end

    def index
        if params[:reciever_id].present?
            notifications = Notification.where(reciever_id: params[:reciever_id])
            if notification.present?
                render json: {message: "notifications found", notifications: notifications}, status: :ok 
            else
                render json: {message: "no notifications", data: []}, status: :not_found
            end
        else
            render json: {message: "not logged in", data: []}, status: :unauthorized
        end
    end
    private
    def notification_params
        params.require(:notification).permit(:sender_id,:reciever_id,:instance_id,:type,:body)
    end
end
