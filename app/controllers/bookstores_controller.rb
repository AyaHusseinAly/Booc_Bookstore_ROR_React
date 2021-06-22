class BookstoresController < ApplicationController

    def allbookstores
        @bookstores = Bookstore.all()
        render :json => @bookstores
    end
    
    def show_bookstore_books
        @bookstore_books = BookstoreBook.find_by(bookstore_id:params[:id])
        render :json => @bookstore_books
  
      end
end
