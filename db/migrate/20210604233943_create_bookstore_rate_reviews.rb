class CreateBookstoreRateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :bookstore_rate_reviews do |t|
      t.integer :rating
      t.text :review
      t.references :bookstore, foreign_key: true

      t.timestamps
    end
  end
end
