class ChaptersController < ApplicationController
    def create
        # @shortStory=ShortStory.find(params['shortStory'])
        @chapter=ShortStoriesChapter.create(title:params['chapterTitle'],summary:params['chapterDescription'],shortStory_id:params['shortStory'])
        render :json => {message:" chapter has been created succefully",chapter:@chapter}
    end
end
