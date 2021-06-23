class AddDistictToBookstores < ActiveRecord::Migration[5.2]
  def change
    add_column :bookstores, :distict, :string
  end
end
