class AddSummaryToNotifications < ActiveRecord::Migration[5.2]
  def change
    add_column :notifications, :summary, :string
    add_column :notifications, :image, :string
  end
end
