class AddDetailsToNotifications < ActiveRecord::Migration[5.2]
  def change
    add_reference :notifications, :sender_id, foreign_key: {to_table: :users}
    add_reference :notifications, :reciever_id, foreign_key: {to_table: :users}
    add_column :notifications, :instance_id, :bigint
  end
end
