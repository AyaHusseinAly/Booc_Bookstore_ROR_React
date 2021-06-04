class CreateBookstoreBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :bookstore_books do |t|
      t.integer :price
      t.string :book_title
      t.string :book_isbn
      t.string :cover
      t.references :bookstore, foreign_key: true

      t.timestamps
    end
  end
end
