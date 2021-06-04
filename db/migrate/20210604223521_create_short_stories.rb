class CreateShortStories < ActiveRecord::Migration[5.2]
  def change
    create_table :short_stories do |t|
      t.string :title
      t.string :cover
      t.string :target_audiance
      t.text :summary
      t.string :status

      t.timestamps
    end
  end
end
