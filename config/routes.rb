Rails.application.routes.draw do
  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
get '/member-data', to: 'members#show'
  # resources :ping, only: [:index] do
  #   collection do
  #     get :auth
  #   end
  # end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: [] do
    collection do
      get :available
    end
  end

  get 'api/shortStories', to:'short_stories#index'
  get 'api/bookmarks', to:'api#bookmarks'  # edit to accept user id
  get 'api/bookshelves', to:'api#bookshelves' # edit to accept user id
  get 'api/bookstores', to:'api#bookstores'
  post '/shortStories', to:'short_stories#create'
  get '/shortStoriesGenres' ,to:'short_stories#getShortStoriesGenres'


end
