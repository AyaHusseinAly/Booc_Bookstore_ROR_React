class LikeStory < ApplicationRecord
  belongs_to :user
  belongs_to :short_story
end
