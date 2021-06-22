class AddLngToBookstores < ActiveRecord::Migration[5.2]
  def change
    add_column :bookstores, :lng, :float
  end
end
