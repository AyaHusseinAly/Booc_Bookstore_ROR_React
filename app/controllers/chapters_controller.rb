class ChaptersController < ApplicationController
    def create
        # @shortStory=ShortStory.find(params['shortStory'])
        @chapter=ShortStoriesChapter.create(title:params['chapterTitle'],summary:params['chapterDescription'],shortStory_id:params['shortStory'])
        if(params["lastChapter"]=="on")
            @shortStory=ShortStory.find(params['shortStory'])
            @shortStory.status='finished'
            @shortStory.save
        end
        render :json => {message:" chapter has been created succefully",chapter:@chapter}
    end
end
