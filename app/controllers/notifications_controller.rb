class NotificationsController < ApplicationController
    def create
        notification = Notification.new(sender_id_id:notification_params[:sender_id],
                                        instance_id:notification_params[:instance_id],
                                        reciever_id_id:notification_params[:reciever_id],
                                        body:notification_params[:body])
        user= User.find(notification_params[:reciever_id])
        if notification.save
            ActionCable.server.broadcast "notification_channel_#{user.id}", {data: notification}
            # NotificationChannel.broadcast_to user, @notification
            flash[:success] = "new notification sent"
            render json: { message: 'sent' ,
                notification: notification
                }, status: :ok
            
        else
            flash.now["danger"] = "error happened"
            render json: { message: 'error' }, status: :bad_request
        end
    end

    def index
        if params[:reciever_id].present?
            notifications = Notification.where(reciever_id_id: params[:reciever_id])
            if notifications.present?
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
        params.permit(:sender_id,:reciever_id,:instance_id,:type,:body)
    end
end
