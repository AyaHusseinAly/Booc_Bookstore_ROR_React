class AddLatToBookstores < ActiveRecord::Migration[5.2]
  def change
    add_column :bookstores, :lat, :float
  end
end
