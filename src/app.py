from lib.ebooks import get_books, get_book
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import joblib
from lib.books_data import books_data
from lib.book_data import book_data as book_data_m
from lib.preprocess import transform_text

app = Flask(__name__)
CORS(app)

@app.route('/books')
async def books():
    return jsonify(books_data)

@app.route('/book')
async def book_data():
    item_url = request.args.get('item_url', '')
    model = joblib.load('artifacts/model.pkl')
    content = pd.Series([review['content'][0] for review in book_data_m[item_url]['reviews']])
    content = transform_text(content)
    content = content.apply(lambda x: ' '.join(x))
    y_pred = model.predict(content)
    book_data_m[item_url]['reviews'] = [{'content': review['content'], 'date': review['date'], 'sentiment': y_pred[i]} for i, review in enumerate(book_data_m[item_url]['reviews'])]
    return jsonify(book_data_m[item_url])

if __name__ == '__main__':
    app.run(debug=True)