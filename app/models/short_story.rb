class ShortStory < ApplicationRecord
    has_many :bookmarks,dependent: :destroy
    has_many :short_stories_chapters, dependent: :destroy
    has_many :short_story_genres, dependent: :destroy
    has_many :comment_stories, dependent: :destroy
    has_many :like_stories, dependent: :destroy
    belongs_to :user

    has_one_attached :image
end
