import matplotlib.pyplot as plt
import pandas as pd
import requests


response = requests.get('http://127.0.0.1:5000/api/properties')

if response.status_code == 200:
        # Extract sold prices from the JSON response
    data = response.json()

    # Filter out properties with sold prices
    sold_prices = [property['sold_price'] for property in data if property['sold_price'] is not None]

    # Check if there are sold prices available
    if sold_prices:
        # Convert sold prices to a Pandas Series
        sold_prices_series = pd.Series(sold_prices)

        # Plot the sold prices
        plt.figure(figsize=(8, 6))
        plt.plot(sold_prices_series, marker='o', linestyle='-')
        plt.title('Sold Prices')
        plt.xlabel('2024')
        plt.ylabel('Sold Price ($)')
        plt.grid(True)
        plt.show()
    else:
        print("No sold prices available in the data.")
else:
    print("Failed to fetch data from the API.")