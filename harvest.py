from homeharvest import scrape_property
from datetime import datetime
import numpy as np


def filter_by_price(properties, min_price=None,max_price=None):
    filter_properties = properties.copy()
    if min_price is not None:
        filter_properties = filter_properties[filter_properties['sold_price']>=min_price]
    if max_price is not None:
        filter_properties = filter_properties[filter_properties['sold_price']<=max_price]
    return filter_properties


def scrapeForSale(location="Boston, MA", listing_type="for_sale", past_days=50, min_price=None, max_price=None):
    properties = scrape_property(location=location, listing_type=listing_type, past_days=past_days)
    if min_price is not None or max_price is not None:
        properties = filter_by_price(properties, min_price, max_price)
    properties_list = properties.to_dict(orient='records')
    return properties_list


def scrapeForSaleCA(location="San Francisco, CA", listing_type="for_sale", past_days=50, min_price=None,max_price=None):
    properties_ca = scrape_property(location=location, listing_type=listing_type, past_days=past_days)
    if min_price is not None or max_price is not None:
        properties_ca = filter_by_price(properties_ca, min_price, max_price)
    properties_list_ca = properties_ca.to_dict(orient='records')
    return properties_list_ca

scrapeForSaleCA()


def scrapeForSaleNY(location="New York City, NY", listing_type="for_sale", past_days=50, min_price=None, max_price=None):
    properties_ny = scrape_property(location=location, listing_type=listing_type, past_days=past_days)
    if min_price is not None or max_price is not None:
        properties_ny = filter_by_price(properties_ny, min_price, max_price)
    properties_list_ny = properties_ny.to_dict(orient='records')
    return properties_list_ny

scrapeForSaleNY()



def scrapeForSold(location="Boston, MA", listing_type="sold", past_days=50, min_price=None, max_price=None):
    properties_df = scrape_property(location=location, listing_type=listing_type, past_days=past_days)
    if min_price is not None or max_price is not None:
        properties_df = filter_by_price(properties_df, min_price, max_price)
    
    # Convert DataFrame to list of dictionaries
    properties_list_sale = properties_df.to_dict(orient='records')
    
    # Handle NaN values in the properties
    for property_info in properties_list_sale:
        for key, value in property_info.items():
            if isinstance(value, float) and np.isnan(value):
                property_info[key] = None  # Replace NaN with None or any other suitable value
    
    return properties_list_sale


def scrapeForPending(location="Boston, MA", listing_type="pending", past_days=50, min_price=None, max_price=None):
    properties = scrape_property(location=location, listing_type=listing_type, past_days=past_days)
    if min_price is not None or max_price is not None:
        properties = filter_by_price(properties, min_price, max_price)
    properties_list_pending = properties.to_dict(orient='records')
    return properties_list_pending






