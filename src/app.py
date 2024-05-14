from lib.ebooks import get_book_data, get_books
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/books')
async def books():
    books_data = get_books()
    return jsonify(books_data)

@app.route('/books/<path:item_url>')
async def book_data(item_url):
    book_data = get_book_data(item_url)
    return jsonify(book_data)

if __name__ == '__main__':
    app.run(debug=True)