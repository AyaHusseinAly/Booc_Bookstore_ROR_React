import { APIBookFacade } from '../interfaces/APIBookFacade';
import axios from 'axios';

export default class GoogleAPI implements APIBookFacade {


    _url = "https://www.googleapis.com/books/v1/volumes?q=";
    _api_key = `${process.env.REACT_APP_GOOGLE_BOOK_API_KEY}`;

    async getByISBN(isbn: string, pageNum: number = 1) {
        let result = {}
        let filteredResult = {}
        const ex = await axios.get(`${this._url}isbn=${isbn}&startIndex=${(pageNum - 1) * 10}`)
            .then(res => {
                result = res.data.items;
            })

        return result;


    }
    async getByCategory(category: string, pageNum: number = 1) {
        let result: {}[] = []
        while (result.length < 10) {
            const ex = await axios.get(`${this._url}subject=${category}&startIndex=${(pageNum - 1) * 10}`)
                .then(res => {
                    let items = res.data.items;
                    items.forEach((item: any) => {
                        if (item['volumeInfo']['categories']) {
                            item['volumeInfo']['categories'].forEach((categ: any) => {
                                if (categ.toLowerCase().includes(category.toLowerCase())) {
                                    result.push(item)
                                }
                            })
                        }
                    })
                })
            pageNum++;
        }
        return result
    }
    async getByTitle(title: string, pageNum: number = 1) {
        let result = {}
        const ex = await axios.get(`${this._url}intitle=${title}&startIndex=${(pageNum - 1) * 10}`)
            .then(res => {
                result = res.data.items;
            })
        return result;
    }
    async getByAuthor(author: string, pageNum: number = 1) {
        let result: {}[] = []
        while (result.length < 10) {
            const ex = await axios.get(`${this._url}inauthor=${author}&startIndex=${(pageNum - 1) * 10}`)
                .then(res => {
                    let items = res.data.items;
                    items.forEach((item: any) => {
                        if (item['volumeInfo']['authors']) {
                            item['volumeInfo']['authors'].forEach((authr: any) => {
                                if (authr.toLowerCase().includes(author.toLowerCase())) {
                                    result.push(item)
                                }
                            })
                        }
                    })
                })
            pageNum++;
        }
        return result;
    }
    async getFilteredBooks(filters: { [key: string]: string }, pageNum: number = 1) {
        let result = {}
        let url = this._url
        for (const key in filters) {
            url = url.concat(key, "=", filters[key], "&")
        }
        if (pageNum != 1)
            url = url.concat(`startIndex=${(pageNum - 1) * 10}`)

        const ex = await axios.get(url)
            .then(res => {
                result = res.data.items;
            })
        return result;
    }




};
