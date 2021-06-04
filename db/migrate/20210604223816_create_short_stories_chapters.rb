class CreateShortStoriesChapters < ActiveRecord::Migration[5.2]
  def change
    create_table :short_stories_chapters do |t|
      t.string :title
      t.text :summary

      t.timestamps
    end
  end
end
