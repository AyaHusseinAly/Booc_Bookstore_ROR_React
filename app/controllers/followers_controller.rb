class FollowersController < ApplicationController
    def followWriter
        @follow=Follow.create(reader_id:params[:reader_id],writer_id:params[:writer_id])
        
        ############get writer info####################
       
        user=User.find(params[:writer_id]) 
        @writer={
           id:user.id,
           name:user.name,
           avatar:'',
           following:Follow.where(reader_id:params[:writer_id]).count,
           follower:Follow.where(writer_id:params[:writer_id]).count

        }
        if user&.avatar&.attached?
        @writer[:avatar] = rails_blob_url(user.avatar)
        end

        render :json=>{message:"followed successfully",following:@follow,writer_info:@writer}
    end
    def unFollowWriter
        if Follow.where(reader_id:params[:reader_id],writer_id:params[:writer_id]).length > 0
            Follow.where(reader_id:params[:reader_id],writer_id:params[:writer_id]).delete_all
            @message="removed following successfully"
            
        else 
            @message="you already don't follow this writer"
        end
        ############get writer info####################
       
        user=User.find(params[:writer_id]) 
        @writer={
        id:user.id,
        name:user.name,
        avatar:'',
        following:Follow.where(reader_id:params[:writer_id]).count,
        follower:Follow.where(writer_id:params[:writer_id]).count

        }
        if user&.avatar&.attached?
            @writer[:avatar] = rails_blob_url(user.avatar)
        end
        
        render :json=>{message:@message,writer_info:@writer}
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
        @readers=[] 
        Follow.where(writer_id:params[:reader_id]).each do |follow|
            user = User.find(follow.reader_id)
            obj={
                id:user.id,
                name:user.name,
                avatar:''
            }
            if user&.avatar&.attached?
            obj[:avatar] = rails_blob_url(user.avatar)
            end
            @readers.push(obj)
        end
        render :json=>{followers:@followers,readers:@readers}
    end
end
