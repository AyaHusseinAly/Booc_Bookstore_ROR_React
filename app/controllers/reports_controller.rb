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
    ########################### admin delete records #########################################
    def deleteRecord
        report=Report.find(params['id'])
        if report.kind=='story'
            s=ShortStory.find(report.related_record_id).destroy()

        elsif report.kind=='chapter'
            ShortStoriesChapter.find(report.related_record_id).destroy()
        elsif report.kind=='commentStory'
            CommentStory.find(report.related_record_id).destroy()
        elsif report.kind=='commentChapter'
            CommentChapter.find(report.related_record_id).destroy()            
        end
        report.destroy()
        
        if report.destroyed

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
            user_name=""
            if report.kind=='story'
                if ShortStory.where(id:report.related_record_id).empty?
                    report.destroy()
                    next
                end
                story=ShortStory.find(report.related_record_id)
                title=story.title
                user_name=story.user.username
                
            elsif report.kind=='chapter'
                if ShortStoriesChapter.where(id:report.related_record_id).empty?
                    report.destroy()
                    next
                end
                chapter=ShortStoriesChapter.find(report.related_record_id)
                title=chapter.title
                content=chapter.summary
                story_title=chapter.short_story.title
                user_name=chapter.short_story.user.username
            elsif report.kind=='commentStory'
                if CommentStory.where(id:report.related_record_id).empty?
                    report.destroy()
                    next
                end
                comment=CommentStory.find(report.related_record_id)
                content=comment.body
                user_name=comment.user.username

            elsif report.kind=='commentChapter'
                if CommentChapter.where(id:report.related_record_id).empty?
                    report.destroy()
                    next
                end
                comment=CommentChapter.find(report.related_record_id)
                content=comment.body
                user_name=comment.user.username

                
            end
            
            @obj={
                "id": report.id,
                "kind": report.kind,
                "reason": report.reason,
                "related_record_id": report.related_record_id,
                "user_id": report.user_id,
                "user_name":user_name,
                "title":title,
                "story_title":story_title,          #for story name of reported is chapter
                "content":content,
                "created_at": report.created_at,
                "updated_at": report.updated_at
            }
            @objArr.push(@obj);

        end
        render :json => {reports:@objArr}

    end
end
