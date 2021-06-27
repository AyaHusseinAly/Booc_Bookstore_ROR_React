class NotificationsController < ApplicationController
    def create
        notification = Notification.new(sender_id_id:notification_params[:sender_id],
                                        instance_id:notification_params[:instance_id],
                                        reciever_id_id:notification_params[:reciever_id],
                                        kind: notification_params[:kind],
                                        body:notification_params[:body],
                                        image:notification_params[:image],
                                        summary:notification_params[:summary])
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
            notifications = Notification.where(reciever_id_id: params[:reciever_id]).order("created_at DESC")
            if notifications.present?
                render json: {message: "notifications found", notifications: notifications}, status: :ok 
            else
                render json: {message: "no notifications", data: []}, status: :not_found
            end
        else
            render json: {message: "not logged in", data: []}, status: :unauthorized
        end
    end

    def read_notifications
        notifications=Notification.where(reciever_id_id:params[:reciever_id])
        if notifications
            notifications.update_all(read: true)
            # notifications.each do |notification|
            #     notification.read = true
            #     if not notification.save
            #         render json: {message: "error happened"}    
            #     end
            # end
            render json: {message: "read notifications"} 
        # else   
        #     render json: {message: "error happened"} 
        end
    end
    private
    def notification_params
        params.permit(:sender_id,:reciever_id,:instance_id,:kind,:body, :summary, :image)
    end

end
