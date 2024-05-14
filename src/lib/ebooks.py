from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

base_url = "https://www.amazon.com"
url = 'https://www.amazon.com/b?node=155009011&ref_=sub_ebooks_cat_4'

def get_book_data(book):
    img_url = book.select('img.product-image')[0]['src']
    title = book.select('a.a-link-normal div.a-box-group.a-spacing-top-micro')[0].contents[0].lstrip().rstrip()
    stars = book.select('div.a-box-group.a-spacing-none a.a-size-small.a-link-normal .a-icon-alt')
    ratings = book.select('div.a-box-group.a-spacing-none a.a-size-small.a-link-normal span.a-size-small.a-color-link')
    item_url = book.find('a', class_="a-size-small a-link-normal")['href']
    price = book.select('div.a-box-group span.a-size-base.a-color-price')
    price = price[0].contents[0].split("$")[1] if len(price) > 0 else None
    try:
        stars = stars[0].contents[0].split(" ")[0]
        ratings = ''.join(ratings[0].contents[0].lstrip().rstrip().split(','))
    except:
        stars = None
        ratings = None
    
    return {
        'title': title,
        'price': price,
        'stars': stars,
        'ratings': ratings,
        'img_url': img_url,
        'item_url': item_url
    }

def get_books():
    options = Options()
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    
    try:
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, 'li.a-carousel-card.dbs-shoveler-card')))
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        books = soup.select('li.a-carousel-card.dbs-shoveler-card')
        return [get_book_data(book) for book in books]
    finally:
        driver.quit()
        
    # (x)title, ()img_url, (x)stars, (x)ratings, (x)author, (x)description, Reviews
def get_book(item_url):
    options = Options()
    options.add_argument('--headless')
    driver = webdriver.Chrome(options=options)
    driver.get(base_url + item_url)
    print(base_url + item_url)
    try:
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, 'productTitle')))
        soup = BeautifulSoup(driver.page_source, 'html.parser')
        title = soup.select_one('#productTitle').contents[0]
        author = soup.select_one('#bylineInfo .author a').contents[0]
        stars = soup.select_one('#acrPopover > span.a-declarative > a > span').contents[0]
        ratings = soup.select_one('#acrCustomerReviewText').contents[0].split(" ")[0]
        description = u''.join(soup.select_one('#bookDescription_feature_div').findAll(text=True))
        img_url = soup.select_one('#landingImage')['src']
        reviews = [text.findAll(text=True) for text in soup.select('.review-text')]
        review_dates = [str(text.findAll(text=True)).split("on")[1].split("'")[0] for text in soup.select('.review-date')]
        [{'content': reviews[i], 'date': review_dates[i]} for i, review in enumerate(reviews)]

        return {
            'title': title,
            'author': author,
            'stars': stars,
            'ratings': ratings,
            'description': description,
            'img_url': img_url,
            'reviews': [{'content': reviews[i], 'date': review_dates[i]} for i, review in enumerate(reviews)]
        }
    finally:
        driver.quit()