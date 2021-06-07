class ShortStorySerializer < ActiveModel::Serializer
  attributes :id, :title, :cover, :target_audiance, :summary, :status
end
