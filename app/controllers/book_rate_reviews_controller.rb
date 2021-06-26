class BookRateReviewsController < ApplicationController
    def addRateReviewBook

        @message=""

        # @rewiew={}

        if params[:rating] 

            if User.where(id:params[:user_id]).length > 0 

                @review = BookRatingReview.create(user_id:params[:user_id],isbn:params[:isbn],rate:params[:rating])

                if params[:review] 

                    @review.review=params[:review]

                    @review.save

                end

                @message="successfully add rate and review"

            else

            @message="bad request ,user not found" 

            end



        else

            @message="bad request ,rating is required"  

        end

        render :json=>{message:@message}

    end

    def ListBookRateReview
        @reviews = []
        BookRatingReview.where(isbn:params[:isbn]).each do |rating|
        # BookRatingReview.all.each do |rating|
            user = User.find(rating.user_id)
            object = {
                rate: rating.rate,
                review: rating.review,
                user_name: user.name,
                user_avatar: "",

                # isbn_book: rating.isbn
            }
            if user&.avatar&.attached?
                object[:user_avatar] = rails_blob_url(user.avatar)
            end
            @review_flag=false
            if BookRatingReview.where(isbn:params['isbn'] ,user_id:params[:login]).length >0
             @review_flag=true
            end

            @reviews.push(object)
        end
        render :json=>{reviews:@reviews,param:params,review_flag: @review_flag}
    end
end
