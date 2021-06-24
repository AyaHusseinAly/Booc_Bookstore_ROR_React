Rails.application.routes.draw do
  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
get '/member-data', to: 'members#show'
get 'user/avatar', to: 'members#avatar'
post '/logged_in', to: 'members#is_logged_in?'
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

  # get 'api/shortStories', to:'api#shortStories'

  get 'api/shortStories', to:'short_stories#index'
  get 'api/bookmarks', to:'api#bookmarks'  # edit to accept user id
  get 'api/bookshelves', to:'api#bookshelves' # edit to accept user id
  get 'api/bookstores', to:'api#bookstores'
  post '/shortStories', to:'short_stories#create'
  post '/shortStoryDetails' ,to:'short_stories#show'
  get '/shortStoriesGenres' ,to:'short_stories#getShortStoriesGenres'
  get '/shortStories' ,to:'short_stories#getShortStories'
  post '/createChapter' , to:'chapters#create'

  get '/allbookstores', to:'bookstores#allbookstores'
  get '/show_bookstore_books/:id', to:'bookstores#show_bookstore_books'
  post '/addbook', to:'bookstores#Add_book'
  delete '/destroyBook/:id', to:'bookstores#destroy_book'

  post 'bookStoreSearchFromMap', to:'bookstores#search'


  post '/communityPosts' , to:'posts#posts'
  post '/commentChapter', to: 'comments_likes#commentChapter'
  post '/likeChapter', to: 'comments_likes#likeChapter' 
  post '/commentStory', to: 'comments_likes#commentStory'
  post '/unlikeChapter', to: 'comments_likes#unlikeChapter' 
  post '/unlikeStory', to: 'comments_likes#unlikeStory'
  post '/likeStory', to: 'comments_likes#likeStory'  
  post '/report' , to: 'reports#create'
  post '/deleteReport' , to: 'reports#deleteReport'
  post '/deleteRecord' , to: 'reports#deleteRecord'


  get '/reports' , to: 'reports#index'

  post '/storyFinished' ,to:'short_stories#setStoryFinished'
  post '/addToBookmark' ,to:'short_stories#addToBookmark'
  post '/removeFromBookmark' ,to: 'short_stories#removeFromBookmark'
  post '/followWriter',to:'short_stories#followWriter'
  post '/unFollowWriter',to:'short_stories#unFollowWriter'
  post '/addRateReviewStory',to:'short_stories#addRateReviewStory'

end
