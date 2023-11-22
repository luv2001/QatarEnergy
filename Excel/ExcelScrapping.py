import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import pandas as pd

# URL of the website
url = "https://www.nseindia.com/get-quotes/derivatives?symbol=BANKNIFTY"

# Create a new instance of the Chrome driver
driver = webdriver.Chrome()

# Navigate to the website
driver.get(url)

# Use WebDriverWait to wait for the button to become clickable (adjust timeout as needed)
button_xpath = '//*[@id="subtab-derivatives"]/div/nav/div/div/a[2]'
button = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.XPATH, button_xpath))
)

# Click the button
button.click()

# Wait for the page to load (adjust sleep time as needed)
time.sleep(5)

# Get the page source after clicking the button
page_source = driver.page_source

# Parse the HTML content of the page
soup = BeautifulSoup(page_source, 'html.parser')

# Locate the HTML select tag and extract options
expiry_select_xpath = '//*[@id="expirySelect"]'
expiry_select = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, expiry_select_xpath))
)

# Print all options for debugging
all_options = Select(expiry_select).options
for option in all_options:
    print(option.text)

# Select the first value from the expirySelect dropdown
expiry_select = Select(expiry_select)
expiry_select.select_by_index(0)  # Select the first option

# Wait for the page to load after selecting the option (adjust sleep time as needed)
time.sleep(5)

# Get the page source after selecting the option
page_source = driver.page_source

# Parse the HTML content of the page
soup = BeautifulSoup(page_source, 'html.parser')

# Locate the HTML table and extract data
table_xpath = '//*[@id="optionChainTable-indices"]'
table = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, table_xpath))
)

# Extract data from the table and store it in a list of dictionaries
data = []
for row in table.find_elements(By.XPATH, './/tr'):
    columns = row.find_elements(By.XPATH, './/td')
    if columns:
        row_data = [column.text.strip() for column in columns]
        data.append(row_data)

# Create a DataFrame using pandas
df = pd.DataFrame(data)

# Export the DataFrame to an Excel file
df.to_excel('output_data.xlsx', index=False)

# Close the browser window
driver.quit()
