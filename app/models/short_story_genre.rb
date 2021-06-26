class ShortStoryGenre < ApplicationRecord
  belongs_to :genre
  belongs_to :short_story

end
