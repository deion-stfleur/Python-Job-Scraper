from flask import Flask, jsonify
from harvest import scrapeForSale, scrapeForSold, scrapeForPending
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/properties")
def get_properties():
    properties = scrapeForSale()
    return jsonify(properties)

@app.route("/api/sold")
def get_sold_properties():
    sold_properties = scrapeForSold()
    return jsonify(sold_properties)

@app.route("/api/pending")
def get_pending_properties():
    pending_properties = scrapeForPending()
    return jsonify(pending_properties)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
