class Like < ApplicationRecord
  belongs_to :short_story
  belongs_to :user
end
