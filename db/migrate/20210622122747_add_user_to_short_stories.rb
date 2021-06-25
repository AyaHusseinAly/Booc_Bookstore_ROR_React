class AddUserToShortStories < ActiveRecord::Migration[5.2]
  def change
    add_reference :short_stories, :user, foreign_key: true
  end
end
