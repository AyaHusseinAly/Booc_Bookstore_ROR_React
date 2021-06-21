class CreateBookstores < ActiveRecord::Migration[5.2]
  def change
    create_table :bookstores do |t|
      t.string :name
      t.string :phone
      t.string :type  #library vs store  #changed to kins as type is reserved word in rails
      t.string :img
      
      t.timestamps
    end
  end
end
