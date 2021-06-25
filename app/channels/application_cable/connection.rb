module ApplicationCable
  class Connection < ActionCable::Connection::Base
    # rescue_from StandardError, with: :report_error

    # private

    # def report_error(e)
    #   SomeExternalBugtrackingService.notify(e)
    # end
    # identified_by :current_user

    # def connect
    #   self.current_user = find_user
    # end

    # protected
    # def find_user
    #   if user = User.find(params[:user_id])
    #     user
    #   else
    #     reject_unauthorized_connection
    #   end
    # end
  end
end
