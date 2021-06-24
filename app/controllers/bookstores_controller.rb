class BookstoresController < ApplicationController

    def allbookstores
        @bookstores = Bookstore.all()
        render :json => @bookstores
    end
    
    def show_bookstore_books
        @bookstore_books = BookstoreBook.find_by(bookstore_id:params[:id])
        render :json => @bookstore_books
  
      end

    def search
        if params['bookName'] != "" && params['selectedOption'] == nil
            #@Bookstore = Bookstore.where("name LIKE ?","%"+ params['bookName']+"%").where(kind: params['selectedOption'])
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
            #@Bookstore = Bookstore.where("name LIKE ?","%"+ params['bookName']+"%")
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

    def get_bookstore_from_seller_id
        bookstore=Bookstore.where(seller_id: parapms[:seller_id])
        if bookstore.present?
            render json: {message: "Bookstore Found", bookstore_id: bookstore.id}, status: ok
        else
            render json: {message: "No Bookstore Found"}, status:not_found
        end
    end
end
