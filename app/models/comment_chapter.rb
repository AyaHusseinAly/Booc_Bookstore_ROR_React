class CommentChapter < ApplicationRecord
  belongs_to :user
  belongs_to :short_stories_chapter
end
