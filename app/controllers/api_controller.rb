class ApiController < ApplicationController

    def shortStories
        @stories = ShortStory.all()
        render :json => @stories
    end

    def bookmarks # edit to accept user id
        @bookmarks = Bookmark.all()
        render :json => @bookmarks
    end

    def bookshelves # edit to accept user id
        @bookshelves = Bookshelf.all()
        render :json => @bookshelves
    end

    def bookstores
        @bookstores = Bookstore.all()
        render :json => @bookstores
    end
    
end
