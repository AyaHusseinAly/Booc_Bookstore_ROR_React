class Report < ApplicationRecord
  attr_accessor :destroyed
  belongs_to :user
  after_destroy :mark_as_destroyed
  def mark_as_destroyed
    self.destroyed = true
  end
end
