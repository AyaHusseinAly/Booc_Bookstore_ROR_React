class CreateLikeChapters < ActiveRecord::Migration[5.2]
  def change
    create_table :like_chapters do |t|
      t.references :user, foreign_key: true
      t.references :short_stories_chapter, foreign_key: true

      t.timestamps
    end
  end
end
