class AddStatusToNotifications < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :read, :boolean, :default => false
  end
end
