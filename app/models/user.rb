class User < ApplicationRecord
  # include Users::Allowlist
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise  :database_authenticatable,
          :registerable,
          :recoverable,
          :rememberable, 
          :validatable, 
          :jwt_authenticatable, 
          jwt_revocation_strategy: JwtDenylist
  # has_many :allowlisted_jwts, dependent: :destroy
  has_one_attached :avatar
  # validates :email,
  # uniqueness: { case_sensitive: false }
  # validates :username,
  # presence: true,
  # length: { minimum: 6 },
  # uniqueness: { case_sensitive: false }
  # validates :username,
  # format: { with: /\A[a-zA-Z0-9_-]+\z/, message: I18n.t('models.users.username') }
  # validates :username,
  # format: { without: /\A\d+\Z/, message: I18n.t('models.users.username_numbers') }
  
  #overriding login function of devise
  # attr_writer :login

  # def login
  #   @login || username || email
  # end

  #tells devise to login using email or username
  # def self.find_for_database_authentication(warden_conditions)
  #   conditions = warden_conditions.dup
  #   login = conditions.delete(:login)
  #   where(conditions).where([
  #     "lower(username) = :value OR lower(email) = :value",
  #     { value: login.strip.downcase },
  #   ]).first
  # end

  # def for_display
  # {
  #   email: email,
  #   username: username,
  #   id: id,
  # }
  # end
end

