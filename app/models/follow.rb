class Follow < ApplicationRecord
    belongs_to :reader,
    :class_name => 'User',
    :foreign_key => 'reader_id'
    belongs_to :writer,
    :class_name => 'User',
    :foreign_key => 'writer_id'
end
