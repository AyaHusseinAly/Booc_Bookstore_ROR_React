class CreateCommentChapters < ActiveRecord::Migration[5.2]
  def change
    create_table :comment_chapters do |t|
      t.text :body
      t.references :user, foreign_key: true
      t.references :short_stories_chapter, foreign_key: true

      t.timestamps
    end
  end
end
