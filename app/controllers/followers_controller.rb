class FollowersController < ApplicationController
    def followWriter
        @follow=Follow.create(reader_id:params[:reader_id],writer_id:params[:writer_id])
        render :json=>{message:"followed successfully",following:@follow}
    end
    def unFollowWriter
        if Follow.where(reader_id:params[:reader_id],writer_id:params[:writer_id]).length > 0
            Follow.where(reader_id:params[:reader_id],writer_id:params[:writer_id]).delete_all
            render :json=>{message:"removed following successfully"}
        else 
            render :json=>{message:"you already don't follow this writer"}
        end
    end
    def followeWriters
        @followers=[] 
        Follow.where(reader_id:params[:reader_id]).each do |follow|
            user = User.find(follow.writer_id)
            obj={
                id:user.id,
                name:user.name,
                avatar:''
            }
            if user&.avatar&.attached?
            obj[:avatar] = rails_blob_url(user.avatar)
            end
            @followers.push(obj)
        end
        render :json=>{followers:@followers}
    end
end
