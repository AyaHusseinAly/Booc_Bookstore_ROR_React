class NotificationChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "notification_channel"
    # @notifications = Notification.where(reciever_id_id: params['reciever_id'])
    # if @notifications.present?
    #   stream_for @notifications
    # else
    #   stream_for nil
    # end
    # @user = User.find(params[:reciever_id])
    stream_from "notification_channel_#{params[:user_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
