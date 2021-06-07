class FixStoreTypeColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :bookstores, :type, :kind
  end
end
