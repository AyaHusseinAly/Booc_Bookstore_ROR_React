class AddKindToNotifications < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :kind, :string
  end
end
