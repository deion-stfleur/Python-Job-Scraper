from homeharvest import scrape_property
from datetime import datetime
import numpy as np




def scrapeForSale(location="Boston, MA", listing_type="for_sale", past_days=50):
    properties = scrape_property(location=location, listing_type=listing_type, past_days=past_days)
    properties_list = properties.to_dict(orient='records')
    return properties_list

scrapeForSale()

def scrapeForSold(location="Boston, MA", listing_type="sold", past_days=50):
    properties_df = scrape_property(location=location, listing_type=listing_type, past_days=past_days)
    
    # Convert DataFrame to list of dictionaries
    properties_list_sale = properties_df.to_dict(orient='records')
    
    # Handle NaN values in the properties
    for property_info in properties_list_sale:
        for key, value in property_info.items():
            if isinstance(value, float) and np.isnan(value):
                property_info[key] = None  # Replace NaN with None or any other suitable value
    
    return properties_list_sale

scrapeForSold()


def scrapeForPending(location="Boston, MA", listing_type="pending", past_days=50):
    properties = scrape_property(location=location, listing_type=listing_type, past_days=past_days)
    properties_list_pending = properties.to_dict(orient='records')
    return properties_list_pending

scrapeForPending()






