class CreateAllowlistJwt < ActiveRecord::Migration[5.2]
  def change
    create_table :allowlist_jwts do |t|
      t.references :user, foreign_key: { on_delete: :cascade }, null: false
      t.string :jti, null: false
      t.string :aud, null: false
      t.datetime :exp, null: false
      # t.string :remote_ip
      # t.string :os_data
      # t.string :browser_data
      # t.string :device_data
      t.timestamps null: false
    end
  end
end
