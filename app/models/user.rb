class User < ApplicationRecord
  validates :first_name, :last_name, :email, :dob, :sex, :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  attr_reader :password

  after_initialize :ensure_session_token

  has_many :posts,
    primary_key: :id,
    foreign_key: :owner_id,
    class_name: :Post

  has_many :profile_posts,
  primary_key: :id,
  foreign_key: :profile_id,
  class_name: :Post

  has_many :requester,
  primary_key: :id,
  foreign_key: :friender_id,
  class_name: :Friend

  has_many :out_friends,
    through: :requester,
    source: :friend

  has_many :requestee,
  primary_key: :id,
  foreign_key: :friendee_id,
  class_name: :Friend

  has_many :in_friends,
    through: :requestee,
    source: :user


  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/default.jpeg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  has_attached_file :cover_image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/default_cover.jpeg"
  validates_attachment_content_type :cover_image, content_type: /\Aimage\/.*\z/

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def friends
    @friends ||= self.in_friends.where("friends.status = 'Accepted'") + self.out_friends.where("friends.status = 'Accepted'")
    # @friends ||= Friend.where("(friends.friender_id = ? OR friends.friendee_id = ?)
    # AND friends.status = 'Accepted'", self.id, self.id)
  end

  def requests
    @friend_requests ||= self.requestee.where(status: "Pending")
  end

  def pending
    @pending ||= self.requester.where(status: "Pending") + self.requestee.where(status: "Pending")
  end
end
