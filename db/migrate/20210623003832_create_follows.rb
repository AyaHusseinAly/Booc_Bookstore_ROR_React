class CreateFollows < ActiveRecord::Migration[5.2]
  def change
    create_table :follows do |t|
      t.integer :reader_id
      t.integer :writer_id

      t.timestamps
    end
  end
end
