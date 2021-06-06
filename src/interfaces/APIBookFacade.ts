export interface APIBookFacade{
    _url: string;
    _api_key: string;

    getByISBN(isbn: string,pageNum: number):{}
    getByTitle(title: string,pageNum: number):{}
    getByCategory(category: string,pageNum: number):{}
    getByAuthor(author: string,pageNum: number):{}
    getFilteredBooks(filters:{[key: string]: string},pageNum:number):{}
    //filter= [home , categories, title, authors]
}
