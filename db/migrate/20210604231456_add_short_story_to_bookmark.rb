class AddShortStoryToBookmark < ActiveRecord::Migration[5.2]
  def change
    add_reference :bookmarks, :short_story, foreign_key: true
  end
end
