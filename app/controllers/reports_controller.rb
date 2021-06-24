class ReportsController < ApplicationController

    def create
        @report=Report.create(kind:params['kind'],reason:params['reason'],related_record_id:params['related_record_id'],user:User.find(params['user_id'])
        )
        if @report.persisted?

            render :json => {message:" Thank you, your response"}
        
        else
            render :json => {message:"Error Occured"}
        end

    end
    ########################### admin delete reports #########################################
    def deleteReport
        @report=Report.find(params['id']).destroy()
        
        if @report.destroyed

            render :json => {message:" deleted successfullye"}
        
        else
            render :json => {message:"Error Occured"}
        end
    end
    ######################################### admin display reports ###########################
    def index
        @objArr=[]
        @reports=Report.all()
        @reports.each do |report|
            title="no title"
            content=""
            story_title = ""
            user_name="ayahussein"
            if report.kind=='story'
                title=ShortStory.find(report.related_record_id).title
            elsif report.kind=='chapter'
                chapter=ShortStoriesChapter.find(report.related_record_id)
                title=chapter.title
                content=chapter.summary
                story_title=chapter.short_story.title
            elsif report.kind=='commentStory'
                comment=CommentStory.find(report.related_record_id)
                content=comment.body

            elsif report.kind=='commentChapter'
                comment=CommentChapter.find(report.related_record_id)
                content=comment.body

                
            end
            
            @obj={
                "id": report.id,
                "kind": report.kind,
                "reason": report.reason,
                "related_record_id": report.related_record_id,
                "user_id": report.user_id,
                "user_name":user_name,
                "title":title,
                "story_title":story_title,                               #for story name of reported is chapter
                "content":content,
                "created_at": report.created_at,
                "updated_at": report.updated_at
            }
            @objArr.push(@obj);

        end
        render :json => {reports:@objArr}

    end
end
