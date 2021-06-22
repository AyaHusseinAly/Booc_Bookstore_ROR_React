class ShortStory < ApplicationRecord
    has_many:bookmarks
    has_many:short_stories_chapters

    has_one_attached :image
end
