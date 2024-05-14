from bs4 import BeautifulSoup
import requests

base_url = "https://www.amazon.com"
url = 'https://www.amazon.com/kindle-dbs/fd/prime-pr/?_encoding=UTF8&ref_=sv_kstore_3'

def get_book_data(book):
    img_url = book.select('img.product-image')[0]['src']
    title = book.select('a.a-link-normal div.a-box-group.a-spacing-top-micro')[0].contents[0].lstrip().rstrip()
    stars = book.select('div.a-box-group.a-spacing-none a.a-size-small.a-link-normal .a-icon-alt')
    ratings = book.select('div.a-box-group.a-spacing-none a.a-size-small.a-link-normal span.a-size-small.a-color-link')
    item_url = base_url + book.find('a', class_="a-size-small a-link-normal")['href']
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
    response = requests.get(url)
    html_content = response.content
    soup = BeautifulSoup(html_content, 'lxml')
    return [get_book_data(book) for book in soup.select('li.a-carousel-card.dbs-shoveler-card')]

# print(books)
# links = soup.find_all('a', class_="a-size-small a-link-normal")
# review_links = ['https://www.amazon.com' + link['href'] for link in links if "product-reviews" in link['href']]

# for link in review_links:
#     requests.get(link)
#     html_content = response.content
#     bookSoup = BeautifulSoup(html_content, 'lxml')
#     title = soup.select('[data-hook="product-link"]')
#     print(title)


# links = soup.find_all('a')
# for link in links:
#     print(link.get('href'))

# descriptions = soup.find_all('p', class_='description')
# for desc in descriptions:
#     print(desc.text)
