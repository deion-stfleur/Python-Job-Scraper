from flask import Flask, jsonify, request
from harvest import scrapeForSale, scrapeForSold, scrapeForPending, scrape_property, scrapeForSaleCA, scrapeForSaleNY
from flask_cors import CORS
from supabase_py import create_client

app = Flask(__name__)
CORS(app)


supabase_url = 'https://yaxkcmagjkcnzuigvxau.supabase.co'
supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlheGtjbWFnamtjbnp1aWd2eGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTExNDMyMDksImV4cCI6MjAyNjcxOTIwOX0.beD-bDGbKnGSBXtrw-Gq62Y3nHTwG_2RlR-_Nb2Hv_c'
supabase = create_client(supabase_url, supabase_key)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']
    password = data['password']
    # Sign up user with email and password
    response = supabase.auth.sign_up(email, password)
    if response['error'] is None:
        return jsonify({'message': 'User signed up successfully'})
    else:
        return jsonify({'error': response['error']['message']}), 400
    

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    # Sign in user with email and password
    response = supabase.auth.sign_in(email, password)
    if response['error'] is None:
        return jsonify({'access_token': response['access_token']})
    else:
        return jsonify({'error': response['error']['message']}), 401



@app.route("/api/properties", methods=['GET'])
def get_properties():
    properties = scrapeForSale()
    pass
    return jsonify(properties)


@app.route('/api/search', methods=['GET'])
def search_properties():
    location = request.args.get('location')
    if location:
        # Perform property search based on the location
        properties_for_sale = scrape_property(location=location, listing_type="for_sale")
        properties_sold = scrape_property(location=location, listing_type="sold")
        properties_pending = scrape_property(location=location, listing_type="pending")

        # Convert properties to a format suitable for JSON response
        properties_data = {
            "for_sale": properties_for_sale.to_dict(orient='records'),
            "sold": properties_sold.to_dict(orient='records'),
            "pending": properties_pending.to_dict(orient='records')
        }
        return jsonify(properties_data)
    else:
        return jsonify({"error": "Location parameter is missing."}), 400
    


@app.route("/api/properties-for-sold", methods=['GET'])
def get_sold_properties():
    sold_properties = scrapeForSold()
    return jsonify(sold_properties)

@app.route("/api/pending", methods=['GET'])
def get_pending_properties():
    pending_properties = scrapeForPending()
    return jsonify(pending_properties)


@app.route("/api/ca-properties-for-sale", methods=['GET'])
def properties_for_sale_ca():
    ca_properties = scrapeForSaleCA()
    return jsonify(ca_properties)

@app.route("/api/ny-properties-for-sale", methods=['GET'])
def properties_for_sale_ny():
    ny_properties = scrapeForSaleNY()
    return jsonify(ny_properties)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
