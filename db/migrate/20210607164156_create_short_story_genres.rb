class CreateShortStoryGenres < ActiveRecord::Migration[5.2]
  def change
    create_table :short_story_genres do |t|
      t.references :genre, foreign_key: true
      t.references :short_story, foreign_key: true

      t.timestamps
    end
  end
end
