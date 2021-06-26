class CreateBookRatingReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :book_rating_reviews do |t|
      t.references :user, foreign_key: true
      t.string :isbn
      t.string :review
      t.float :rate

      t.timestamps
    end
  end
end
