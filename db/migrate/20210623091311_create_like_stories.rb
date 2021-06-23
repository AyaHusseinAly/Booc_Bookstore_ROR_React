class CreateLikeStories < ActiveRecord::Migration[5.2]
  def change
    create_table :like_stories do |t|
      t.references :user, foreign_key: true
      t.references :short_story, foreign_key: true

      t.timestamps
    end
  end
end
