class ShortStoriesController < ApplicationController
    # def apiIndex
    #     @stories = ShortStory.all()
    #     render :json => @stories
    # end
    def create 
        @shortstory=ShortStory.create(title:params['shortStoryTitle'],summary:params['shortStoryDescription'], cover:params['shortStoryCover'],target_audiance:params['shortStoryAudience'],status:'Not finished yet')
        params['shortStoryGenre'].each do |genre|
            @genre=Genre.find(genre)
            ShortStoryGenre.create(genre:@genre,short_story:@shortstory)
        end
        @stories = ShortStory.all()
        render :json => {message:" short story created succefully",story:@shortstory}
    end
    def getShortStoriesGenres
        @genres=Genre.all()
        render :json=> @genres
    end
    def index
        @stories = ShortStory.all()
        render :json => {stories:@stories}

    end

end
