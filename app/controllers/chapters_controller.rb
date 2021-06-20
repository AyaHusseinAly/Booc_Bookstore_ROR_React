class ChaptersController < ApplicationController
    def create
        # @shortStory=ShortStory.find(params['shortStory'])
        @chapter=ShortStoriesChapter.create(title:params['chapterTitle'],summary:params['chapterDescription'],short_story_id:params['shortStory'])
        render :json => {message:" chapter has been created succefully",chapter:@chapter}
    end
    def posts
        @chapters = ShortStoriesChapter.all().order("created_at DESC");
        @stories = ShortStory.all().order("created_at DESC");
        @posts=[];
        @stories.each do |story|
            postObj={
                writer:"Islam Karim",
                content: story.summary,
                story_title:story.title,
                chapter_title:"Summary",
                liked_users:[1,2,3],
                comments:[{user_id:1,comment_content:"nice story"},{user_id:2,comment_content:"Great story"}],

            }
            @posts.push(postObj);
        end
        @chapters.each do |chapter|
            postObj={
                writer:"Aya Hussein",
                content: chapter.summary,
                story_title:chapter.short_story.title,
                chapter_title:chapter.title,
                liked_users:[1,2,3],
                comments:[{user_id:1,comment_content:"nice story"},{user_id:2,comment_content:"Great story"}],

            }
            @posts.push(postObj);
        end

        render :json => {posts:@posts}

    end
end
