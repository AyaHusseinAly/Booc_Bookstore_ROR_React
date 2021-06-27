class CommentsLikesController < ApplicationController
   
   
    def commentChapter
        @comment=CommentChapter.create(body:params['body'],short_stories_chapter_id:params['chapter_id'],user_id:params['user_id'])
        @comments=[]
        if CommentChapter.where(short_stories_chapter_id:params['chapter_id']).length >0
            CommentChapter.where(short_stories_chapter_id:params['chapter_id']).each do |comment|
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
                @comments.push(commentObj);
            end
        end
        if @comment.persisted?
            chapter=ShortStoriesChapter.find(params[:chapter_id])
            writer=ShortStory.find(chapter.short_story.id).user
            user=User.find(@comment.user_id)
            render :json => {message:" Success",comments:@comments, chapter_id: chapter.id, writer_id: writer.id, comment: @comment}       
        else
            render :json => {message:"Error Occured",comments:@comments}
        end

    end


    # def likeChapter
    #     @like=LikeChapter.create(short_stories_chapter_id:params['chapter_id'],user_id:params['user_id'])
    #     if @like.persisted?

    #         render :json => {message:"Success"}
        
    #     else
    #         render :json => {message:"Error Occured"}
    #     end
    # end


    def likeChapter
        @like=LikeChapter.create(short_stories_chapter_id:params['chapter_id'],user_id:params['user_id'])
        @chLikes=[]
        LikeChapter.where(short_stories_chapter_id:params['chapter_id']).each do |like|
            user=User.find(like.user_id)
            likeObj={
                user_id:like.user_id,
                user_name:user.name,
                user_img:""
            }
            if user&.avatar&.attached?
                likeObj[:user_img] = rails_blob_url(user.avatar)
            end
            @chLikes.push(likeObj);
        end
        @likeFlag=false
        if LikeChapter.where(short_stories_chapter_id:params['chapter_id'],user_id:params['user_id']).length >0
            @likeFlag=true
        end
        if @like.persisted?

            render :json => {message:"Success",storyLikes:@chLikes,likeFlag:@likeFlag}
        
        else
            render :json => {message:"Error Occured",storyLikes:@chLikes,likeFlag:@likeFlag}
        end
    end




    # def commentStory
    #     @comment=CommentStory.create(body:params['body'],short_story_id:params['story_id'],user_id:params['user_id'])
    #     if @comment.persisted?
    #         render :json => {message:"Success"}       
    #     else
    #         render :json => {message:"Error Occured"}
    #     end

    # end
    def commentStory
        @comment=CommentStory.create(body:params['body'],short_story_id:params['story_id'],user_id:params['user_id'])
        @comments=[]
        if CommentStory.where(short_story_id:params['story_id']).length >0
            CommentStory.where(short_story_id:params['story_id']).each do |comment|
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
                @comments.push(commentObj);
            end
        end
        if @comment.persisted?
            writer=ShortStory.find(params[:story_id]).user
            render :json => {message:"Success",comments:@comments,writer_id:writer.id,comment: @comment, sender: @comment.user}       
        else
            render :json => {message:"Error Occured",comments:@comments}
        end

    end


    # def likeStory
    #     @like=LikeStory.create(short_story_id:params['story_id'],user_id:params['user_id'])
    #     if @like.persisted?

    #         render :json => {message:"Success"}
        
    #     else
    #         render :json => {message:"Error Occured"}
    #     end
    # end

    def likeStory
        @like=LikeStory.create(short_story_id:params['story_id'],user_id:params['user_id'])
        @storyLikes=[]
        LikeStory.where(short_story_id:params['story_id']).each do |like|
            user=User.find(like.user_id)
            likeObj={
                user_id:like.user_id,
                user_name:user.name,
                user_img:""
            }
            if user&.avatar&.attached?
                likeObj[:user_img] = rails_blob_url(user.avatar)
            end
            @storyLikes.push(likeObj);
        end
        @likeFlag=false
        if LikeStory.where(short_story_id:params['story_id'],user_id:params['user_id']).length >0
            @likeFlag=true
        end
        if @like.persisted?

            render :json => {message:"Success",storyLikes:@storyLikes,likeFlag:@likeFlag}
        
        else
            render :json => {message:"Error Occured",storyLikes:@storyLikes,likeFlag:@likeFlag}
        end
    end

  
    def unlikeStory
        records =LikeStory.where(short_story_id:params['story_id'],user_id:params['user_id'])
        if records.length>0
           records.each do |record|
                record.delete()
           end
        end
        @storyLikes=[]
        LikeStory.where(short_story_id:params['story_id']).each do |like|
            user=User.find(like.user_id)
            likeObj={
                user_id:like.user_id,
                user_name:user.name,
                user_img:""
            }
            if user&.avatar&.attached?
                likeObj[:user_img] = rails_blob_url(user.avatar)
            end
            @storyLikes.push(likeObj);
        end
        @likeFlag=false
        if LikeStory.where(short_story_id:params['story_id'],user_id:params['user_id']).length >0
            @likeFlag=true
        end
        render :json => {message:"Successfully unlike",storyLikes:@storyLikes,likeFlag:@likeFlag}
    end

    def unlikeChapter
       records= LikeChapter.where(short_stories_chapter_id:params['chapter_id'],user_id:params['user_id'])
       if records.length>0
        records.each do |record|
            record.delete()
        end
        end
        @chLikes=[]
        LikeChapter.where(short_stories_chapter_id:params['chapter_id']).each do |like|
            user=User.find(like.user_id)
            likeObj={
                user_id:like.user_id,
                user_name:user.name,
                user_img:""
            }
            if user&.avatar&.attached?
                likeObj[:user_img] = rails_blob_url(user.avatar)
            end
            @chLikes.push(likeObj);
        end
        @likeFlag=false
        if LikeChapter.where(short_stories_chapter_id:params['chapter_id'],user_id:params['user_id']).length >0
            @likeFlag=true
        end
        render :json => {message:"Successfully unlike chapter",storyLikes:@chLikes,likeFlag:@likeFlag}
    end

    def listStoryComments
        @comments=[]
        if CommentStory.where(short_story_id:params['story_id']).length >0
            CommentStory.where(short_story_id:params['story_id']).each do |comment|
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
        render :json => {comments:@comments}
    end

end
