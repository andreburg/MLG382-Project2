from lib.ebooks import get_books, get_book
from flask import Flask, jsonify, request
from flask_cors import CORS
from lib.books_data import books_data
from lib.book_data import book_data as book_data_m

app = Flask(__name__)
CORS(app)

@app.route('/books')
async def books():
    return jsonify(books_data)

@app.route('/book')
async def book_data():
    item_url = request.args.get('item_url', '')
    # book_data = get_book(item_url)
    return jsonify(book_data_m[item_url])

if __name__ == '__main__':
    app.run(debug=True)