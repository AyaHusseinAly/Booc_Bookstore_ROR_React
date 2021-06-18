class ShortStory < ApplicationRecord
    has_many:bookmarks
    has_one_attached :image
end
