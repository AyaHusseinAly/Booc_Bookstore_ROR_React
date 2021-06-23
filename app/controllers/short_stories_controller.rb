class ShortStoriesController < ApplicationController
    # def apiIndex
    #     @stories = ShortStory.all()
    #     render :json => @stories
    # end
    # before_action :authenticate_user!
    def index
        @stories = ShortStory.all().order("created_at DESC");
        render :json => {stories:@stories}

    end
    def create 
        # @shortstory=ShortStory.create(title:params['shortStoryTitle'],summary:params['shortStoryDescription'], cover:params['shortStoryCover'],target_audiance:params['shortStoryAudience'],status:'Not finished yet')
        # params['shortStoryGenre'].each do |genre|
        #     @genre=Genre.find(genre)
        #     ShortStoryGenre.create(genre:@genre,short_story:@shortstory)
        # end
        # @shortstory.cover_image.attach(params['shortStoryCover'])
        # rails_blob_path(object.images, only_path: true)
        @shortstory=ShortStory.create(title:params['shortStoryTitle'],summary:params['shortStoryDescription'], cover:'https://raw.githubusercontent.com/do-community/react_rails_recipe/master/app/assets/images/Sammy_Meal.jpg',target_audiance:params['shortStoryAudience'],status:'Not finished yet')
        params['shortStoryGenre'].split(',').each do |genre|
            @genre=Genre.find(genre)
            ShortStoryGenre.create(genre:@genre,short_story:@shortstory)
        end 
        @shortstory.image.attach(params[:shortStoryCover])
        @stories = ShortStory.all()
        render :json => {message:" short story created succefully",story:@shortstory}
    end
    def getShortStoriesGenres
        @genres=Genre.all()
        render :json=> @genres
    end

    # def index
    #     @stories = ShortStory.all().order("created_at DESC");
    #     render :json => {stories:@stories}

    # end

    def getShortStories
        @NotFinishedYet=ShortStory.where(status:'Not finished yet')
        @Finished=ShortStory.where(status:'finished')
        render :json=>{NotFinishedYet:@NotFinishedYet,Finished:@Finished}
    end
    def show
        
        if ShortStory.where(id:params['id']).first != nil
           @shortStory=ShortStory.find(params['id'])
           @chapters=ShortStoriesChapter.where(short_story_id:params['id'])
           @genre_ids=ShortStoryGenre.select('genre_id').where(short_story:@shortStory)
           @genres=Genre.where(id:@genre_ids)
           @image=""
           if @shortStory&.image&.attached?
            @image= rails_blob_url(@shortStory.image)
           end
           @createdDate=ShortStory.find(params['id']).created_at.strftime('%d %b %Y')
           render :json=>{message:"request successfully",shortStory:@shortStory,chapters:@chapters,genres:@genres,date:@createdDate,image:@image}
        else 
            render :json=>{message:"bad request"}  
        end     
    end
    def setStoryFinished
        @shortStory=ShortStory.find(params['id'])
        @shortStory.status='finished'
        @shortStory.save
        render :json=>{message:"request successfully"}

    end
    

end
