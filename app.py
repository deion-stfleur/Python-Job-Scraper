from flask import Flask, jsonify, request
from harvest import scrapeForSale, scrapeForSold, scrapeForPending, scrape_property
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/properties")
def get_properties():
    properties = scrapeForSale()
    pass
    return jsonify(properties)


@app.route("/api/search", methods=["POST"])
def search_properties():
    data = request.get_json()  # Get JSON data from the request body

    # Extract the location from the JSON data or default to "Boston, MA"
    location = data.get('location', 'Boston, MA')

    # Scrape properties based on the provided location
    properties_df = scrape_property(location=location)

    # Convert DataFrame to a list of dictionaries
    properties_list = properties_df.to_dict(orient='records')

    pass
    return jsonify(properties_list)

@app.route("/api/properties-for-sold")
def get_sold_properties():
    sold_properties = scrapeForSold()
    return jsonify(sold_properties)

@app.route("/api/pending")
def get_pending_properties():
    pending_properties = scrapeForPending()
    return jsonify(pending_properties)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
