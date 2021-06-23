class CommentsLikesController < ApplicationController
   
   
    def commentChapter
        @comment=CommentChapter.create(body:params['body'],short_stories_chapter_id:params['chapter_id'],user_id:params['user_id'])
        if @comment.persisted?
            render :json => {message:" Success"}       
        else
            render :json => {message:"Error Occured"}
        end

    end


    def likeChapter
        @like=LikeChapter.create(short_stories_chapter_id:params['chapter_id'],user_id:params['user_id'])
        if @like.persisted?

            render :json => {message:"Success"}
        
        else
            render :json => {message:"Error Occured"}
        end
    end




    def commentStory
        @comment=CommentStory.create(body:params['body'],short_story_id:params['story_id'],user_id:params['user_id'])
        if @comment.persisted?
            render :json => {message:"Success"}       
        else
            render :json => {message:"Error Occured"}
        end

    end


    def likeStory
        @like=LikeStory.create(short_story_id:params['story_id'],user_id:params['user_id'])
        if @like.persisted?

            render :json => {message:"Success"}
        
        else
            render :json => {message:"Error Occured"}
        end
    end


  
    def unlikeStory
        records =LikeStory.where(short_story_id:params['story_id'],user_id:params['user_id'])
        if records.length>0
           records.each do |record|
                record.delete()
           end
           end
    end

    def unlikeChapter
       records= LikeChapter.where(short_stories_chapter_id:params['chapter_id'],user_id:params['user_id'])
       if records.length>0
        records.each do |record|
            record.delete()
        end
        end
    end

end
