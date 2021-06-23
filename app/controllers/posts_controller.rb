class PostsController < ApplicationController
    def posts
        @chapters = ShortStoriesChapter.all().order("created_at DESC");
        @stories = ShortStory.all().order("created_at DESC");
        @posts=[];
        @stories.each do |story|
            likes_db = LikeStory.where(short_story_id: story.id)
            comments_db = CommentStory.where(short_story_id: story.id)
            likes=[]
            comments=[]
            Array(likes_db).each do |like| 
                likes.push({user_name:like.user.username,user_img:"img/exPP.png", user_id: like.user.id})
            end    
            Array(comments_db).each do |comment| 
                comments.push({user_id:comment.user.id,user_name:comment.user.username,user_img:"img/exPP.png",comment_content:comment.body})
            end
            liked_bool=is_current_user_likes_this_story(story.id,params['user_id'])
            
            postObj={
                id: story.id,
                kind: "story",
                writer:"Islam Karim",
                content: story.summary,
                story_title:story.title,
                chapter_title:"Summary",
                liked_users:likes,
                comments:comments,
                is_liked:liked_bool,
                created_at:story.created_at

            }
            @posts.push(postObj);
        end
        @chapters.each do |chapter|
            likes_db = LikeChapter.where(short_stories_chapter_id: chapter.id)
            comments_db = CommentChapter.where(short_stories_chapter_id: chapter.id)
            likes=[]
            comments=[]
            Array(likes_db).each do |like| 
                likes.push({user_name:like.user.username,user_img:"img/exPP.png", user_id: like.user.id})
            end    
            Array(comments_db).each do |comment| 
                comments.push({user_id:comment.user.id,user_name:comment.user.username,user_img:"img/exPP.png",comment_content:comment.body})
            end
            liked_bool=is_current_user_likes_this_chapter(chapter.id,params['user_id'])

            postObj={
                id: chapter.id,
                kind:"chapter",
                writer:"Aya Hussein",
                content: chapter.summary,
                story_title:chapter.short_story.title,
                chapter_title:chapter.title,
                liked_users: likes,
                is_liked:liked_bool,
                comments: comments,
                created_at:chapter.created_at

            }
            @posts.push(postObj);
        end

        @posts.sort! { |a, b|  b[:created_at].to_i <=> a[:created_at].to_i }


        render :json => {posts:@posts}

    end

    def is_current_user_likes_this_story(story_id,user_id)
        check = LikeStory.where(short_story_id:story_id,user_id:user_id)
        if check.length>0         
            return true
            
        end
        return false
    end

    def is_current_user_likes_this_chapter(story_id,user_id)
        check = LikeChapter.where(short_stories_chapter_id:story_id,user_id:user_id)
        if check.length>0         
            return true
            
        end
        return false
    end
end
