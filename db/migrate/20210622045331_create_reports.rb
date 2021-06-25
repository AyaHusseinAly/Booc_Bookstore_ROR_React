class CreateReports < ActiveRecord::Migration[5.2]
  def change
    create_table :reports do |t|
      t.string :kind #chapter or story
      t.text :reason  
      t.integer :related_record_id  #chapter  or story id
      t.references :user, foreign_key: true  #reporter

      t.timestamps
    end
  end
end
