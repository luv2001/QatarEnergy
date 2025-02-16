import os
import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from google.auth.transport.requests import Request
from google.oauth2.service_account import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from datetime import datetime
# Google Sheets API scope
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SPREADSHEET_ID = '1QXuHMa_EfFnpgZFlbjxKugBY1ytkXmYfuYI1i-2nU0I'  # Replace with your Google Sheet ID
SHEET_NAME = 'Sheet1'  # Update if your sheet name is different

SERVICE_ACCOUNT_FILE = 'service_account.json'


# Function to authenticate Google Sheets API
def authenticate_google_sheets():
    # Use the service account credentials for a headless environment
    creds = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    service = build('sheets', 'v4', credentials=creds)
    return service


# Function to update data in Google Sheets
# Function to update data in Google Sheets# Function to update data in Google Sheets
from datetime import datetime

# Function to update data in Google Sheets
def update_google_sheet(service, data):
    # 1) Create the last updated timestamp (for row 1, cell A1)
    last_updated = f"Last updated time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    
    # -- First update: Only cell A1 --
    service.spreadsheets().values().update(
        spreadsheetId=SPREADSHEET_ID,
        range=f'{SHEET_NAME}!A1',         # Only A1
        valueInputOption='RAW',
        body={'values': [[last_updated]]} # Single cell
    ).execute()
    
    # -- Second update: The table from A2 downward --
    result = service.spreadsheets().values().update(
        spreadsheetId=SPREADSHEET_ID,
        range=f'{SHEET_NAME}!A2',         # Start at row 2
        valueInputOption='RAW',
        body={'values': data}             # Your table data (list of lists)
    ).execute()
    
    print(f"{result.get('updatedCells')} cells updated in Google Sheet.")


# Set up Chrome options
chrome_options = Options()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
chrome_options.add_argument("--headless")  # Run in headless mode
chrome_options.add_argument("--user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.6943.53 Safari/537.36")
chrome_options.page_load_strategy = "eager"

# Initialize WebDriver with options
service_chromedriver = Service("/usr/bin/chromedriver")
driver = webdriver.Chrome(service=service_chromedriver, options=chrome_options)

# Open the website
url = 'https://www.nseindia.com/option-chain'
print(f"Opening website: {url}")
driver.get(url)
time.sleep(5)
print("Opened the website successfully")

table_x_path = '//*[@id="optionChainTable-indices"]'

# Wait for the table to load
try:
    print(f"Waiting for table element: {table_x_path}")
    WebDriverWait(driver, 40).until(
        EC.presence_of_element_located((By.XPATH, table_x_path))
    )
    print("Table loaded successfully")
except Exception as e:
    print("An error occurred while waiting for the table to load:", str(e))
    driver.quit()
    exit()

# Extract the table data
try:
    print("Attempting to find the table element...")
    table = driver.find_element(By.XPATH, table_x_path)
    print("Table found successfully!")
    
    table_html = table.get_attribute('outerHTML')
    print("Extracted the table data successfully")
    
    # Read table HTML into DataFrame
    df = pd.read_html(table_html)[0]
    df.columns = [' '.join(col).strip() if isinstance(col, tuple) else col for col in df.columns]  # Flatten headers
    
    print("\n==== DEBUG: Extracted Table Preview ====")
    print(df.head())
    
    # Convert DataFrame to list of lists (including header row)
    data = df.astype(str).values.tolist()
    data.insert(0, df.columns.tolist())
except Exception as e:
    print("ERROR: Failed to extract table", e)
    driver.quit()
    exit()

# Close WebDriver
driver.quit()
print("WebDriver closed successfully.")

# Authenticate Google Sheets API and update sheet
service_sheets = authenticate_google_sheets()
update_google_sheet(service_sheets, data)

