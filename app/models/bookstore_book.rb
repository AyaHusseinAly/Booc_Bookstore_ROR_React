class BookstoreBook < ApplicationRecord
  belongs_to :bookstore

  has_one_attached :image

end
