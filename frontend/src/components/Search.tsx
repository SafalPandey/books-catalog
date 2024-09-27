import React from 'react'
import { Book } from '../domain/BooksList';
import { Link } from 'react-router-dom';
import { fetchBooksList } from '../services/booksList';

export default function Search() {
    const [books, setBooks] = React.useState<Book[]>([]);
    const [searchedBooks, setSearchedBooks] = React.useState<Book[]>([]);
    const [load,setLoad] = React.useState(false)
    const [alert, setAlert] = React.useState('')
    React.useEffect(() => {
        setLoad(true)
        fetchBooksList()
            .then(res => {
                setBooks(res);
                setAlert('Successfully fetched data');
                setTimeout(() => setAlert(''), 1000);
            })
            .catch(err => console.log(err))
            .finally(()=>setLoad(false))
    })

    const searchBook = (name: string) => {
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(name.toLowerCase()))
        setSearchedBooks(filteredBooks)
    }

    return (
        <div>
            <input type="text" placeholder='Search for book' onChange={(e) => searchBook(e.target.value)} />
            {load && <div style={{margin:'20px'}}>{<span className="loader"></span>}</div>}
            {searchedBooks.map((book) => <Link
                to={`/book/${book.id}`}
                className="flex items-center justify-between space-x-8 p-6 bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500"
            >
                <div className="py-3 px-4 text-xl text-white font-semibold">
                    <span title={book.title}>{book.title}</span>
                </div>
                <div className="bg-indigo-600 float-right p-1.5 text-white text-xs font-semibold rounded-lg">
                    <span title="Year">{book.year}</span>
                </div>
            </Link>)}
            {alert && <div style={{margin:'20px',position:'fixed',bottom:'10px',color:'green',zIndex:100}}>{alert}</div>}
        </div>
    )
}
