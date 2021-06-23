class ReportsController < ApplicationController

    def create
        @report=Report.create(kind:params['kind'],reason:params['reason'],related_record_id:params['related_record_id'],user:User.find(params['user_id'])
        )
        if @report.persisted?

            render :json => {message:" Thank you, your response is recorded and sent to admins"}
        
        else
            render :json => {message:"Error Occured"}
        end

    end
    def index
        @objArr=[]
        @reports=Report.all()
        @reports.each do |report|
            title="no title"
            content="no content"
            user_name="ayahussein"
            if report.kind=='story'
                title=ShortStory.find(report.related_record_id).title
            elsif report.kind=='chapter'
                chapter=ShortStoriesChapter.find(report.related_record_id)
                title=chapter.title
                content=chapter.summary
            elsif report.kind=='comment'
                Comment.find(report.related_record_id)
                title="no title"
                
            end
            
            @obj={
                "id": 1,
                "kind": report.kind,
                "reason": report.reason,
                "related_record_id": report.related_record_id,
                "user_id": report.user_id,
                "user_name":user_name,
                "title":title,
                "content":content,
                "created_at": report.created_at,
                "updated_at": report.updated_at
            }
            @objArr.push(@obj);

        end
        render :json => {reports:@objArr}

    end
end
