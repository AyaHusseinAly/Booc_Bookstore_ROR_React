class CommentsLikesController < ApplicationController
    def commentChapter
        @comment=Comment.create(body:params['body'],short_stories_chapter_id:params['chapter_id'])
        if @comment.persisted?

            render :json => {message:" Thank you"}
        
        else
            render :json => {message:"Error Occured"}
        end

    end
    def likeChapter
    end

end
