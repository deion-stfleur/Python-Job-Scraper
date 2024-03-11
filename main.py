from fastapi import FastAPI
from homeharvest import scrape_property
from fastapi.encoders import jsonable_encoder
from harvest import scrapeForSale, scrapeForSold, scrapeForPending
from pydantic import BaseModel
import numpy as np
import json




app = FastAPI()

class Property(BaseModel):
    location: str
    # listing_type: str
    # past_days: float


@app.post("/properties")
async def create_property(property: Property):
    print(Property)
    return property




@app.get("/api/properties")
def get_properties():
    scraped_properties = scrapeForSale()
    for property_info in scraped_properties:
        for key, value in property_info.items():
            if isinstance(value, float) and (value != value):  # Check if the value is NaN
                property_info[key] = None  # Replace NaN with None or any other suitable value
    
    # Return the processed data as a JSON response
    return json.loads(json.dumps(scraped_properties))


@app.get("/api/properties-for-sold")
def get_sold_properties():
    scraped_properties_sold = scrapeForSold()
    for property_info in scraped_properties_sold:
        for key, value in property_info.items():
            if isinstance(value, float) and (value != value):  # Check if the value is NaN
                property_info[key] = None  # Replace NaN with None or any other suitable value
    
    # Return the processed data as a JSON response
    return json.loads(json.dumps(scraped_properties_sold))


@app.get("/api/properties-pending")
def get_pending_properties():
    scraped_properties_pending = scrapeForPending()
    for property_info in scraped_properties_pending:
        for key, value in property_info.items():
            if isinstance(value, float) and (value != value):  # Check if the value is NaN
                property_info[key] = None  # Replace NaN with None or any other suitable value
    
    # Return the processed data as a JSON response
    return json.loads(json.dumps(scraped_properties_pending))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
