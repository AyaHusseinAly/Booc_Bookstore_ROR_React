class ChaptersController < ApplicationController
    def create
        # @shortStory=ShortStory.find(params['shortStory'])
        @chapter=ShortStoriesChapter.create(title:params['chapterTitle'],summary:params['chapterDescription'],short_story_id:params['shortStory'])

        if(params["lastChapter"]=="on")
            @shortStory=ShortStory.find(params['shortStory'])
            @shortStory.status='finished'
            @shortStory.save
        end
        render :json => {message:" chapter has been created succefully",chapter:@chapter}
    end
    def posts
        @chapters = ShortStoriesChapter.all().order("created_at DESC");
        @stories = ShortStory.all().order("created_at DESC");
        @posts=[];
        @stories.each do |story|
            likes_db = LikeStory.find_by(short_story_id: story.id)
            comments_db = CommentStory.find_by(short_story_id: story.id)
            likes=[]
            comments=[]
            Array(likes_db).each do |like| 
                likes.push({user_name:like.user.username,user_img:"img/exPP.png", user_id: like.user.id})
            end    
            Array(comments_db).each do |comment| 
                comments.push({user_id:comment.user.id,user_name:comment.user.username,user_img:"img/exPP.png",comment_content:comment.body})
            end
            postObj={
                id: story.id,
                kind: "story",
                writer:"Islam Karim",
                content: story.summary,
                story_title:story.title,
                chapter_title:"Summary",
                liked_users:likes,
                comments:comments,
                created_at:story.created_at

            }
            @posts.push(postObj);
        end
        @chapters.each do |chapter|
            likes_db = LikeChapter.find_by(short_stories_chapter_id: chapter.id)
            comments_db = CommentChapter.find_by(short_stories_chapter_id: chapter.id)
            likes=[]
            comments=[]
            Array(likes_db).each do |like| 
                likes.push({user_name:like.user.username,user_img:"img/exPP.png", user_id: like.user.id})
            end    
            Array(comments_db).each do |comment| 
                comments.push({user_id:comment.user.id,user_name:comment.user.username,user_img:"img/exPP.png",comment_content:comment.body})
            end
            postObj={
                id: chapter.id,
                kind:"chapter",
                writer:"Aya Hussein",
                content: chapter.summary,
                story_title:chapter.short_story.title,
                chapter_title:chapter.title,
                liked_users: likes,
                comments: comments,
                created_at:chapter.created_at

            }
            @posts.push(postObj);
        end

        @posts.sort! { |a, b|  b[:created_at].to_i <=> a[:created_at].to_i }


        render :json => {posts:@posts}

    end
end
