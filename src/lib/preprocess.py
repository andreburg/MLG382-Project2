from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.stem.porter import PorterStemmer
import joblib
import pandas as pd
import nltk
import string
import re
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('vader_lexicon')

lowercase = lambda text: text.lower()
replace_apostrophe = lambda text: re.sub(r"'", '', text)
replace_punctuation = lambda text: re.sub(rf'[{string.punctuation}]', ' ', text)
remove_excess_spaces = lambda text: re.sub(rf'[{string.punctuation}]', ' ', text).strip()
clean_text = lambda text: remove_excess_spaces(replace_punctuation(replace_apostrophe(lowercase(text))))
tokenize_sentence = lambda sentence: nltk.word_tokenize(sentence)
remove_stopwords = lambda tokenized_sentence: [word for word in tokenized_sentence if word not in set(stopwords.words('english'))]
remove_rare_words = lambda tokenized_sentence, word_counts: [word for word in tokenized_sentence if word not in word_counts[word_counts <= 1]]
lemamatize_words = lambda tokenized_sentence: [WordNetLemmatizer().lemmatize(word) for word in tokenized_sentence]
stem_text = lambda tokenized_sentence: [PorterStemmer().stem(word) for word in tokenized_sentence]

def transform_text(data):
    data = data.apply(clean_text)
    data = data.apply(tokenize_sentence)
    data = data.apply(remove_stopwords)
    word_counts = pd.DataFrame([word for sentence in data for word in sentence]).value_counts()
    data = data.apply(lambda tokenized_sentence: remove_rare_words(tokenized_sentence, word_counts))
    data = data.apply(lemamatize_words)
    return data