class AddShortStoryToShortStoriesChapters < ActiveRecord::Migration[5.2]
  def change
     add_reference :short_stories_chapters, :short_story, foreign_key: true
  end
end