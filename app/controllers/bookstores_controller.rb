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
    @book=BookstoreBook.create!(book_title:params['bookTitle'],price:params['bookPrice'],book_isbn:params['bookIsbn'], cover:'',bookstore_id:params['bookstoreId'])
        @book.image.attach(params[:bookCover])
        if @book&.image&.attached?
            @book.cover= rails_blob_url(@book.image)
            @book.save()
        end
    #@bookstores = Bookstore.all()
    render :json => {message:" add book created succefully",book:@book}
    end

    def destroy_book
        @book=BookstoreBook.find(params[:id])
        @book.destroy
        render :json => {message:" destroy book  succefully"}
    end




      
    ################## Search From Map ############################
    def search
        my_array = ["Giza","Alexandria","Cairo"]
        if my_array.include? params["distict"]
        #if params["distict"] != nil
            if params['bookName'] != "" && params['selectedOption'] == nil
                @Bookstore = Bookstore.where("name LIKE ?","%"+ params['bookName']+"%").where(distict: params[ "distict"])
                @poistion = []
                @stores = []
                @Bookstore.each do |bookstore|
                    positionobj={
                        lat: bookstore.lat,
                        lng: bookstore.lng,
                    }
                    stores= {
                            id: bookstore.id,
                            name:bookstore.name,
                            phone: bookstore.phone, 
                            kind: bookstore.kind, 
                            img: bookstore.img,
                            created_at: bookstore.created_at,
                            updated_at: bookstore.updated_at, 
                            position: positionobj,
                    }
                    @stores.push(stores);
                end
                render :json =>{stores: @stores}
            elsif params['bookName'] != "" && params['selectedOption'] != nil
                @Bookstore = Bookstore.where("name LIKE ?","%"+ params['bookName']+"%").where(kind: params['selectedOption']).where(distict: params[ "distict"])
                @poistion = []
                @stores = []
                @Bookstore.each do |bookstore|
                    positionobj={
                        lat: bookstore.lat,
                        lng: bookstore.lng,
                    }
                    stores= {
                            id: bookstore.id,
                            name:bookstore.name,
                            phone: bookstore.phone, 
                            kind: bookstore.kind, 
                            img: bookstore.img,
                            created_at: bookstore.created_at,
                            updated_at: bookstore.updated_at, 
                            position: positionobj,
                    }
                    @stores.push(stores);
                end
                render :json =>{stores: @stores}
            elsif params['bookName'] == "" && params['selectedOption'] != nil
                @Bookstore = Bookstore.where(kind: params['selectedOption']).where(distict: params[ "distict"])
                @poistion = []
                @stores = []
                @Bookstore.each do |bookstore|
                    positionobj={
                        lat: bookstore.lat,
                        lng: bookstore.lng,
                    }
                    stores= {
                        id: bookstore.id,
                        name:bookstore.name,
                        phone: bookstore.phone, 
                        kind: bookstore.kind, 
                        img: bookstore.img,
                        created_at: bookstore.created_at,
                        updated_at: bookstore.updated_at, 
                        position: positionobj,
                    }
                    @stores.push(stores);
                end
                render :json =>{stores: @stores}
            elsif  params['bookName'] == "" && params['selectedOption'] == nil
                @Bookstore = Bookstore.where(distict: params[ "distict"])
                @poistion = []
                @stores = []
                @Bookstore.each do |bookstore|
                    positionobj={
                        lat: bookstore.lat,
                        lng: bookstore.lng,
                    }
                    stores= {
                        id: bookstore.id,
                        name:bookstore.name,
                        phone: bookstore.phone, 
                        kind: bookstore.kind, 
                        img: bookstore.img,
                        created_at: bookstore.created_at,
                        updated_at: bookstore.updated_at, 
                        position: positionobj,
                    }
                    @stores.push(stores);
                end
                render :json =>{stores: @stores}
                #render :json => {message:"hello from back", title:params['bookName'],kind:params['selectedOption'],distinct:params[ "distict"],sharemyLocation:params["sharemyLocation"]}
            end
        else
            ################ No Distinct ####################
            if params['bookName'] != "" && params['selectedOption'] == nil
                @Bookstore = Bookstore.where("name LIKE ?","%"+ params['bookName']+"%")
                @poistion = []
                @stores = []
                @Bookstore.each do |bookstore|
                    positionobj={
                        lat: bookstore.lat,
                        lng: bookstore.lng,
                    }
                    stores= {
                          id: bookstore.id,
                          name:bookstore.name,
                          phone: bookstore.phone, 
                          kind: bookstore.kind, 
                          img: bookstore.img,
                          created_at: bookstore.created_at,
                          updated_at: bookstore.updated_at, 
                          position: positionobj,
                    }
                    @stores.push(stores);
                end
                render :json =>{stores: @stores}
            elsif params['bookName'] != "" && params['selectedOption'] != nil
                @Bookstore = Bookstore.where("name LIKE ?","%"+ params['bookName']+"%").where(kind: params['selectedOption'])
                @poistion = []
                @stores = []
                @Bookstore.each do |bookstore|
                    positionobj={
                        lat: bookstore.lat,
                        lng: bookstore.lng,
                    }
                    stores= {
                          id: bookstore.id,
                          name:bookstore.name,
                          phone: bookstore.phone, 
                          kind: bookstore.kind, 
                          img: bookstore.img,
                          created_at: bookstore.created_at,
                          updated_at: bookstore.updated_at, 
                          position: positionobj,
                    }
                    @stores.push(stores);
                end
                render :json =>{stores: @stores}
            elsif params['bookName'] == "" && params['selectedOption'] != nil
                @Bookstore = Bookstore.where(kind: params['selectedOption'])
                @poistion = []
                @stores = []
                @Bookstore.each do |bookstore|
                    positionobj={
                        lat: bookstore.lat,
                        lng: bookstore.lng,
                    }
                    stores= {
                        id: bookstore.id,
                        name:bookstore.name,
                        phone: bookstore.phone, 
                        kind: bookstore.kind, 
                        img: bookstore.img,
                        created_at: bookstore.created_at,
                        updated_at: bookstore.updated_at, 
                        position: positionobj,
                    }
                    @stores.push(stores);
                end
                render :json =>{stores: @stores}
            else
               render :json =>{stores: @stores}
               #render :json => {message:"hello from back", title:params['bookName'],kind:params['selectedOption'],distinct:params[ "distict"],sharemyLocation:params["sharemyLocation"]}
            end
        end
    end
end
