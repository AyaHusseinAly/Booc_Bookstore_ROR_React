Rails.application.routes.draw do
  get 'api/shortStories', to:'short_stories#apiIndex'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
