from flask import Flask, render_template
from harvest import scrapeForSale


app = Flask(__name__)

@app.route("/")
def index():
    scraped_properties = scrapeForSale()
    return render_template("index.html", properties=scraped_properties)


if __name__ == "__main__":
    app.run(debug=True)

