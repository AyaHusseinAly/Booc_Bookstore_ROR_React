class ShortStoriesChapter < ApplicationRecord
    belongs_to:short_story
    has_many:comment_chapters, dependent: :destroy
    has_many:like_chapters, dependent: :destroy
end
