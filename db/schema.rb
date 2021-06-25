# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_06_24_182153) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "allowlist_jwts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "jti", null: false
    t.string "aud", null: false
    t.datetime "exp", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_allowlist_jwts_on_user_id"
  end

  create_table "allowlisted_jwts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "jti", null: false
    t.string "aud", null: false
    t.datetime "exp", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_allowlisted_jwts_on_user_id"
  end

  create_table "bookmarks", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "short_story_id"
    t.bigint "user_id"
    t.index ["short_story_id"], name: "index_bookmarks_on_short_story_id"
    t.index ["user_id"], name: "index_bookmarks_on_user_id"
  end

  create_table "bookshelves", force: :cascade do |t|
    t.string "isbn"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "bookstore_books", force: :cascade do |t|
    t.integer "price"
    t.string "book_title"
    t.string "book_isbn"
    t.string "cover"
    t.bigint "bookstore_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bookstore_id"], name: "index_bookstore_books_on_bookstore_id"
  end

  create_table "bookstore_rate_reviews", force: :cascade do |t|
    t.integer "rating"
    t.text "review"
    t.bigint "bookstore_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["bookstore_id"], name: "index_bookstore_rate_reviews_on_bookstore_id"
  end

  create_table "bookstores", force: :cascade do |t|
    t.string "name"
    t.string "phone"
    t.string "kind"
    t.string "img"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float "lat"
    t.float "lng"
    t.string "distict"
  end

  create_table "comment_chapters", force: :cascade do |t|
    t.text "body"
    t.bigint "user_id"
    t.bigint "short_stories_chapter_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["short_stories_chapter_id"], name: "index_comment_chapters_on_short_stories_chapter_id"
    t.index ["user_id"], name: "index_comment_chapters_on_user_id"
  end

  create_table "comment_stories", force: :cascade do |t|
    t.text "body"
    t.bigint "user_id"
    t.bigint "short_story_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["short_story_id"], name: "index_comment_stories_on_short_story_id"
    t.index ["user_id"], name: "index_comment_stories_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "body"
    t.bigint "short_stories_chapter_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["short_stories_chapter_id"], name: "index_comments_on_short_stories_chapter_id"
  end

  create_table "downloads", force: :cascade do |t|
    t.string "isbn"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "follows", force: :cascade do |t|
    t.integer "reader_id"
    t.integer "writer_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "genres", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "jwt_denylist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti"
  end

  create_table "like_chapters", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "short_stories_chapter_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["short_stories_chapter_id"], name: "index_like_chapters_on_short_stories_chapter_id"
    t.index ["user_id"], name: "index_like_chapters_on_user_id"
  end

  create_table "like_stories", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "short_story_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["short_story_id"], name: "index_like_stories_on_short_story_id"
    t.index ["user_id"], name: "index_like_stories_on_user_id"
  end

  create_table "notifications", force: :cascade do |t|
    t.string "type"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "sender_id_id"
    t.bigint "reciever_id_id"
    t.bigint "instance_id"
    t.index ["reciever_id_id"], name: "index_notifications_on_reciever_id_id"
    t.index ["sender_id_id"], name: "index_notifications_on_sender_id_id"
  end

  create_table "reports", force: :cascade do |t|
    t.string "kind"
    t.text "reason"
    t.integer "related_record_id"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_reports_on_user_id"
  end

  create_table "short_stories", force: :cascade do |t|
    t.string "title"
    t.string "cover"
    t.string "target_audiance"
    t.text "summary"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["user_id"], name: "index_short_stories_on_user_id"
  end

  create_table "short_stories_chapters", force: :cascade do |t|
    t.string "title"
    t.text "summary"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "short_story_id"
    t.index ["short_story_id"], name: "index_short_stories_chapters_on_short_story_id"
  end

  create_table "short_story_genres", force: :cascade do |t|
    t.bigint "genre_id"
    t.bigint "short_story_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["genre_id"], name: "index_short_story_genres_on_genre_id"
    t.index ["short_story_id"], name: "index_short_story_genres_on_short_story_id"
  end

  create_table "story_rate_reviews", force: :cascade do |t|
    t.integer "rating"
    t.text "review"
    t.bigint "short_story_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["short_story_id"], name: "index_story_rate_reviews_on_short_story_id"
  end

  create_table "story_rating_reviews", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "short_story_id"
    t.string "review"
    t.float "rate"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["short_story_id"], name: "index_story_rating_reviews_on_short_story_id"
    t.index ["user_id"], name: "index_story_rating_reviews_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.string "name"
    t.text "bio"
    t.date "dob"
    t.string "role", default: "user"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "allowlist_jwts", "users", on_delete: :cascade
  add_foreign_key "allowlisted_jwts", "users", on_delete: :cascade
  add_foreign_key "bookmarks", "short_stories"
  add_foreign_key "bookmarks", "users"
  add_foreign_key "bookstore_books", "bookstores"
  add_foreign_key "bookstore_rate_reviews", "bookstores"
  add_foreign_key "comment_chapters", "short_stories_chapters"
  add_foreign_key "comment_chapters", "users"
  add_foreign_key "comment_stories", "short_stories"
  add_foreign_key "comment_stories", "users"
  add_foreign_key "comments", "short_stories_chapters"
  add_foreign_key "like_chapters", "short_stories_chapters"
  add_foreign_key "like_chapters", "users"
  add_foreign_key "like_stories", "short_stories"
  add_foreign_key "like_stories", "users"
  add_foreign_key "notifications", "users", column: "reciever_id_id"
  add_foreign_key "notifications", "users", column: "sender_id_id"
  add_foreign_key "reports", "users"
  add_foreign_key "short_stories", "users"
  add_foreign_key "short_stories_chapters", "short_stories"
  add_foreign_key "short_story_genres", "genres"
  add_foreign_key "short_story_genres", "short_stories"
  add_foreign_key "story_rate_reviews", "short_stories"
  add_foreign_key "story_rating_reviews", "short_stories"
  add_foreign_key "story_rating_reviews", "users"
end