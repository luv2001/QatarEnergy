from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import time  # Import the time module for fixed delays

# Initialize WebDriver
options = Options()
options.add_argument("--start-maximized")  # Start maximized (optional)
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

try:
    # Navigate to the website and log in
    driver.get("https://ltp.investingdaddy.com/detailed-options-chain.php?symbol=BANKNIFTY")

    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, '//*[@id="login"]/div[1]/div[2]/div/form'))
    )
    
    # Login details
    username_field = driver.find_element(By.XPATH, '//*[@id="username"]')
    password_field = driver.find_element(By.XPATH, '//*[@id="login"]/div[1]/div[2]/div/form/div[2]/div/input')
    terms_checkbox = driver.find_element(By.XPATH, '//*[@id="terms"]')
    login_button = driver.find_element(By.XPATH, '//*[@id="login"]/div[1]/div[2]/div/form/div[5]/center/button')

    # Fill login form
    username_field.send_keys('7046701695')
    password_field.send_keys('Amulkool11@')

    if not terms_checkbox.is_selected():
        terms_checkbox.click()

    time.sleep(2)
    login_button.click()

    time.sleep(2)  # Wait for login and table load

    # Extract table data after login
    table = driver.find_element(By.XPATH, '//*[@id="tech-companies-1"]')

    # Fetch table headers
    headers = [header.text for header in table.find_elements(By.XPATH, './/thead/tr/th')]

    # Fetch table rows
    rows = []
    for row in table.find_elements(By.XPATH, './/tbody/tr'):
        cells = row.find_elements(By.XPATH, './td')
        
        # Adjust the number of cells if they don't match the headers
        if len(cells) < len(headers):
            cells += [None] * (len(headers) - len(cells))  # Fill missing cells with None
        elif len(cells) > len(headers):
            cells = cells[:len(headers)]  # Trim extra cells
        
        row_data = [cell.text if cell else '' for cell in cells]
        rows.append(row_data)
    # Create a DataFrame from the table data
    df = pd.DataFrame(rows, columns=headers)

    # Save the DataFrame to an Excel file
    df.to_excel('extracted_table_data.xlsx', index=False)
    print("Excel file 'extracted_table_data.xlsx' has been created successfully.")

except Exception as e:
    print("An error occurred:", e)

finally:
    # Clean up and close WebDriver
    driver.quit()
