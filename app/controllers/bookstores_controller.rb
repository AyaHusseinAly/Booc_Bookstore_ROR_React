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

    ################## Create BookStore  ############################
    def create  
        @user = User.new(email:params['AdminEmail'], password:params['AdminPassword'],password_confirmation:params['ReAdminPassword'],role: "seller")
        if @user.save()
            #register_success
            # Create Book Store
            @store = Bookstore.create(name:params['StoreTitle'],phone:params['StorePhone'],img:'',lat:30.178821799548725,lng:31.224003216678657,kind: params['selectedOption'], distict:params['StoreCity'],user_id: @user.id) 
            @store.image.attach(params['BookStoreCover'])
            if @store&.image&.attached?
                @store.img= rails_blob_url(@store.image)
                @store.save()
                render :json =>{name: params['StoreTitle'],phone:params['StorePhone'],address:params['StoreAddress'] ,city:params['StoreCity'],street:params['StoreStreet'],kind:params['selectedOption'], nameAdmin:params['AdminEmail'],AdminPassword:params['AdminPassword'],ReAdminPassword:params['ReAdminPassword'],user: @user}
            end 
        ## end Create Book Store
        else
            register_failed(@user)
        end

      end

        
        # Create Admin To Store
        
      #  render :json =>{name: params['StoreTitle'],phone:params['StorePhone'],address:params['StoreAddress'] ,city:params['StoreCity'],street:params['StoreStreet'],kind:params['selectedOption'], nameAdmin:params['AdminEmail'],AdminPassword:params['AdminPassword'],ReAdminPassword:params['ReAdminPassword']}
    #end

    def register_failed(resource)
        render json: { message: "Something went wrong", errors: [
          {
            status: '400',
            title: 'Bad Request',
            details: resource.errors,
            code: '100'
          }
        ]
      }, status: :ok
      end

    ################## Search From Map ############################
    def search
        if params['bookName'] != ""
           @bookstores_id = BookstoreBook.where("book_title LIKE ?","%"+ params['bookName']+"%").select("bookstore_id")
        end    

        my_array = ["Cairo","Alexandria","Giza","Port Said","Suez","Luxor","al-Mansura","Damanhur","6th of October City","Kafr el-Dawwar"]
        if my_array.include? params["distict"]
            if params['bookName'] != "" && params['selectedOption'] == nil
                #@Bookstore = Bookstore.where("name LIKE ?","%"+ params['bookName']+"%").where(distict: params[ "distict"])
                @Bookstore = Bookstore.where(id: @bookstores_id).where(distict: params[ "distict"])
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
                @Bookstore = Bookstore.where(id: @bookstores_id).where(kind: params['selectedOption']).where(distict: params[ "distict"])
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
                @Bookstore = Bookstore.where(id: @bookstores_id)
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
                @Bookstore = Bookstore.where(id: @bookstores_id).where(kind: params['selectedOption'])
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

    def get_bookstore_from_seller_id
        bookstore=Bookstore.find_by(user_id: params[:seller_id])
        if bookstore.present?
            render json: {message: "Bookstore Found", bookstore_id: bookstore.id, status: "ok"}
        else
            render json: {message: "No Bookstore Found", status:"not_found"}

        end
    end

    def apiSearch  
        if params['q'] != ""
            @bookstores_id = BookstoreBook.where("book_title LIKE ?","%"+ params['q']+"%").select("bookstore_id")
            @Bookstore = Bookstore.where(id: @bookstores_id)
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
        end
     end

    def getAllStores
        @stores = Bookstore.all
        render :json =>{stores: @stores}
    end
     
end
