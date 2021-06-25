class CreateCommentStories < ActiveRecord::Migration[5.2]
  def change
    create_table :comment_stories do |t|
      t.text :body
      t.references :user, foreign_key: true
      t.references :short_story, foreign_key: true

      t.timestamps
    end
  end
end
