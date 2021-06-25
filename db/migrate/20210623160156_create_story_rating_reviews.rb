class CreateStoryRatingReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :story_rating_reviews do |t|
      t.references :user, foreign_key: true
      t.references :short_story, foreign_key: true
      t.string :review
      t.float :rate

      t.timestamps
    end
  end
end
