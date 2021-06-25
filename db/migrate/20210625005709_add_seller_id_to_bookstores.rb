class AddSellerIdToBookstores < ActiveRecord::Migration[5.2]
  def change
    add_reference :bookstores, :user, foreign_key: true
  end
end
