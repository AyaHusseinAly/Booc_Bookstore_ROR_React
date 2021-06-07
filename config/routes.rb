Rails.application.routes.draw do

  get 'api/shortStories', to:'api#shortStories'
  get 'api/bookmarks', to:'api#bookmarks'  # edit to accept user id
  get 'api/bookshelves', to:'api#bookshelves' # edit to accept user id
  get 'api/bookstores', to:'api#bookstores'

  post '/shortStories', to:'short_stories#create'
  get '/shortStoriesGenres' ,to:'short_stories#getShortStoriesGenres'


end
