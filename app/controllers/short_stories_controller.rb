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
        @shortstory=ShortStory.create(title:params['shortStoryTitle'],summary:params['shortStoryDescription'], cover:'',target_audiance:params['shortStoryAudience'],status:'Not finished yet',user_id:params['writer'])
        params['shortStoryGenre'].split(',').each do |genre|
            @genre=Genre.find(genre)
            ShortStoryGenre.create(genre:@genre,short_story:@shortstory)
        end 
        @shortstory.image.attach(params[:shortStoryCover])
        if @shortstory&.image&.attached?
            @shortstory.cover= rails_blob_url(@shortstory.image)
            @shortstory.save()
        end 
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
        @Finished=[]
        @NotFinishedYet=[]
        ShortStory.where(status:'Not finished yet').each do |story|
            @image=""
            if story&.image&.attached?
             @image= rails_blob_url(story.image)
            end 
            @allReviews=StoryRatingReview.where(short_story_id:story.id )
            @storyRate=StoryRatingReview.where(short_story_id:story.id ).sum(:rate)
            if @allReviews.length > 0
                @storyRate = @storyRate/@allReviews.length
                if @storyRate - @storyRate.to_i < 0.25
                    @storyRate=@storyRate.to_i 
                elsif @storyRate - @storyRate.to_i < 0.75
                    @storyRate=@storyRate.to_i + 0.5
                else
                    @storyRate=@storyRate.to_i + 1.0
                end    
            end
            obj={
                id:story.id,
                title:story.title,
                cover:@image,
                target_audiance:story.target_audiance,
                summary:story.summary,
                status:story.status,
                created_at:story.created_at,
                user_id:story.user_id,
                rate:@storyRate

            }
            @NotFinishedYet.push(obj);
            
        end
        # @Finished.each do |story|
        #     @image=""
        #     if story&.image&.attached?
        #      @image= rails_blob_url(story.image)
        #     end 
        #     story[:cover]=@image
        # end
        ShortStory.where(status:'finished').each do |story|
        @image=""
        if story&.image&.attached?
         @image= rails_blob_url(story.image)
        end 
        @allReviews=StoryRatingReview.where(short_story_id:story.id )
        @storyRate=StoryRatingReview.where(short_story_id:story.id ).sum(:rate)
        if @allReviews.length > 0
            @storyRate = @storyRate/@allReviews.length
            if @storyRate - @storyRate.to_i < 0.25
                @storyRate=@storyRate.to_i 
            elsif @storyRate - @storyRate.to_i < 0.75
                @storyRate=@storyRate.to_i + 0.5
            else
                @storyRate=@storyRate.to_i + 1.0
            end    
        end
        obj={
            id:story.id,
            title:story.title,
            cover:@image,
            target_audiance:story.target_audiance,
            summary:story.summary,
            status:story.status,
            created_at:story.created_at,
            user_id:story.user_id,
            rate:@storyRate

        }
        @Finished.push(obj);
        
    end
        render :json=>{NotFinishedYet:@NotFinishedYet,Finished:@Finished}
    end
    def show    
        if ShortStory.where(id:params['id']).first != nil
           @shortStory=ShortStory.find(params['id'])
           @chapters=[]
           if ShortStoriesChapter.where(short_story_id:params['id']).length >0
            ShortStoriesChapter.where(short_story_id:params['id']).each do |chapter|
            @likesCh=[]
            LikeChapter.where(short_stories_chapter_id:chapter.id ).each do |likeRecord|
                user=User.find(likeRecord.user_id)
                @likesCh.push(user)
            end
            @commentsCh=[]
            if CommentChapter.where(short_stories_chapter_id:params['id']).length >0
                CommentChapter.where(short_stories_chapter_id:params['id']).each do |comment|
                    user=User.find(comment.user_id)
                    commentObj={
                        user_id:comment.user_id,
                        user_name:user.name,
                        user_img:"",
                        comment_content:comment.body,

                    }
                    if user&.avatar&.attached?
                        commentObj[:user_img] = rails_blob_url(user.avatar)
                    end
                    @commentsCh.push(commentObj);
                end
            end
            @likeChFlag=false
            if LikeChapter.where(short_stories_chapter_id:chapter.id,user_id:params[:login]).length >0
              @likeChFlag=true
            end
            chapterObj={
                id: chapter.id,
                title: chapter.title,
                summary: chapter.summary, 
                created_at: chapter.created_at, 
                updated_at: chapter.updated_at, 
                short_story_id: chapter.short_story_id,
                likes: @likesCh,
                comments:@commentsCh,
                userLikeFlag:@likeChFlag
            }
            @chapters.push(chapterObj);
            end
           end 





           @genre_ids=ShortStoryGenre.select('genre_id').where(short_story:@shortStory)
           @genres=Genre.where(id:@genre_ids)
           @image=""
           if @shortStory&.image&.attached?
            @image= rails_blob_url(@shortStory.image)
           end
           @login={}
           if params[:login]
            @login=User.find(params[:login])
           end
           @writer=User.find(@shortStory.user_id)
           @bookmarked_flag=false
           if Bookmark.where(short_story_id: params[:id], user_id:params[:login]).length>0
            @bookmarked_flag=true
           end
           @followed_flag=false
           if Follow.where(reader_id: params[:login], writer_id:@writer).length>0
            @followed_flag=true
           end
           @createdDate=ShortStory.find(params['id']).created_at.strftime('%d %b %Y')
           @reviews=[]
           @storyRate=0
           @allReviews=StoryRatingReview.where(short_story_id:params['id'] )
           @allReviews.each do |rateReview|
                user=User.find(rateReview.user_id)
                @storyRate=@storyRate+rateReview.rate
                if user&.avatar&.attached?
                    objreview={
                        id:rateReview.id,
                        user_id:rateReview.user_id,
                        user_name:User.find(rateReview.user_id).name,
                        user_avatar:rails_blob_url(user.avatar),
                        review:rateReview.review,
                        rate:rateReview.rate
                }
                else
                    objreview={
                        id:rateReview.id,
                        user_id:rateReview.user_id,
                        user_name:User.find(rateReview.user_id).name,
                        user_avatar:"",
                        review:rateReview.review,
                        rate:rateReview.rate
                }
                end
            
                @reviews.push(objreview);
           end
           if @allReviews.length > 0
            @storyRate = @storyRate/@allReviews.length
            if @storyRate - @storyRate.to_i < 0.25
                @storyRate=@storyRate.to_i 
            elsif @storyRate - @storyRate.to_i < 0.75
                @storyRate=@storyRate.to_i + 0.5
            else
                @storyRate=@storyRate.to_i + 1.0
            end    
           end
           @review_flag=false
           if StoryRatingReview.where(short_story_id:params['id'] ,user_id:params[:login]).length >0
            @review_flag=true
           end
           @likeStory=[]
           if LikeStory.where(short_story_id:params['id']).length >0
            LikeStory.where(short_story_id:params['id']).each do |like|
                user=User.find(like.user_id)
                likeObj={
                    user_id:like.user_id,
                    user_name:user.name,
                    user_img:""
                }
                if user&.avatar&.attached?
                    likeObj[:user_img] = rails_blob_url(@shortStory.image)
                end
                @likeStory.push(likeObj);
            end
           end
           @likeFlag=false
           if LikeStory.where(short_story_id:params['id'],user_id:params[:login]).length >0
            @likeFlag=true
           end
           @commentStory=[]
           if CommentStory.where(short_story_id:params['id']).length >0
            CommentStory.where(short_story_id:params['id']).each do |comment|
                user=User.find(comment.user_id)
                commentObj={
                    user_id:comment.user_id,
                    user_name:user.name,
                    user_img:"",
                    comment_content:comment.body,

                }
                if user&.avatar&.attached?
                    commentObj[:user_img] = rails_blob_url(user.avatar)
                end
                @commentStory.push(commentObj);
            end
           end
           render :json=>{message:"request successfully",shortStory:@shortStory,chapters:@chapters,genres:@genres,date:@createdDate,image:@image,writer:@writer,logIn:@login,bookmarked_flag:@bookmarked_flag,followed_flag:@followed_flag,reviews:@reviews,review_flag:@review_flag,storyRate:@storyRate,storyLikes:@likeStory,likeFlag:@likeFlag,commentStory:@commentStory}
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
    def addToBookmark
        @bookmark=Bookmark.create( short_story_id: params[:story_id], user_id:params[:user_id])
        render :json=>{message:"added to bookmark successfully",Bookmark:@bookmark}
    end
    
    def removeFromBookmark
        if Bookmark.where( short_story_id: params[:story_id], user_id:params[:user_id]).length > 0
            Bookmark.where( short_story_id: params[:story_id], user_id:params[:user_id]).delete_all
            render :json=>{message:"removed from bookmark successfully"}
        else 
            render :json=>{message:"it is not in your bookmark already"}
        end
    end
    def followWriter
        @follow=Follow.create(reader_id:params[:reader_id],writer_id:params[:writer_id])
        render :json=>{message:"followed successfully",following:@follow}
    end
    def unFollowWriter
        if Follow.where(reader_id:params[:reader_id],writer_id:params[:writer_id]).length > 0
            Follow.where(reader_id:params[:reader_id],writer_id:params[:writer_id]).delete_all
            render :json=>{message:"removed following successfully"}
        else 
            render :json=>{message:"you already don't follow this writer"}
        end
    end
    def addRateReviewStory
        @message=""
        @rewiew={}
        if params[:rating] 
            if User.where(id:params[:user_id]).length > 0 && ShortStory.where(id:params[:story_id]).length > 0 
                @review=StoryRatingReview.create(user_id:params[:user_id],short_story_id:params[:story_id],rate:params[:rating])
                if params[:review] 
                    @review.review=params[:review]
                    @review.save
                end
                @message="successfully add rate and review"
            else
            @message="bad request ,user or short story not found" 
            end

        else
            @message="bad request ,rating is requred"  
        end
        render :json=>{message:@message,rate_review:@reviewrails}
    end

end
