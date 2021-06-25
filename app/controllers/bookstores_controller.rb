class BookstoresController < ApplicationController

    def allbookstores
        @bookstores = Bookstore.all()
        render :json => @bookstores
    end
    
    def show_bookstore_books
        # @bookstore_books = BookstoreBook.find_all_by(bookstore_id:params[:id])
        @bookstore_books = BookstoreBook.where(bookstore_id:params[:id])

        render :json => @bookstore_books
  
    end
    
    
    def Add_book 
    @book=BookstoreBook.create!(book_title:params['bookTitle'],price:params['bookPrice'],book_isbn:params['bookIsbn'],bookstore_id:params['bookstoreId'])
       
    #@bookstores = Bookstore.all()
    render :json => {message:" add book created succefully",book:@book}
    end

    def destroy_book
        @book=BookstoreBook.find(params[:id])
        @book.destroy
        render :json => {message:" destroy book  succefully"}
    end




end
