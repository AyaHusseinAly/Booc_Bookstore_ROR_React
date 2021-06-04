class CreateStoryRateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :story_rate_reviews do |t|
      t.integer :rating
      t.text :review
      t.references :shortstory, foreign_key: true

      t.timestamps
    end
  end
end
