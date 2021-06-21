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
                id: story.id,
                writer:"Islam Karim",
                content: story.summary,
                story_title:story.title,
                chapter_title:"Summary",
                liked_users:[1,2,3],
                comments:[{user_id:1,comment_content:"nice story"},{user_id:2,comment_content:"Great story"}],
                created_at:story.created_at

            }
            @posts.push(postObj);
        end
        @chapters.each do |chapter|
            postObj={
                id: chapter.id,
                writer:"Aya Hussein",
                content: chapter.summary,
                story_title:chapter.short_story.title,
                chapter_title:chapter.title,
                liked_users:[1,2,3],
                comments:[{user_id:1,comment_content:"nice story"},{user_id:2,comment_content:"Great story"}],
                created_at:chapter.created_at

            }
            @posts.push(postObj);
        end

        @posts.sort! { |a, b|  b[:created_at].to_i <=> a[:created_at].to_i }
        # @posts.sort! { |a, b|  DateTime.parse(b[:created_at].to_s) <=> DateTime.parse(a[:created_at].to_s)}
        # @posts.reverse!

        render :json => {posts:@posts}

    end
end
