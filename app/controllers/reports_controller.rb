class ReportsController < ApplicationController

    def create
        puts params
        # @report=Report.create(kind:params['kind'],reason:params['reason'],related_record_id:params['related_record_id'],user_id:params['reporter']);
        # if @report.persisted?
        #     render :json => {message:" Report created succefully"}
        
        # else
        #     render :json => {message:"Error Occured"}
        # end

    end
    def index
        # @reports=Report.all()
        # Until users is ready
        @reports=[{kind:"story",reason:"against women rights",related_record_id:1,user:{user_name:'Aya Hussein',user_img:"img/exPP.png", user_id: '1'}}]
        render :json => {reports:@reports}

    end
end
