import pandas as pd
import joblib
import requests

# Load the trained model
model = joblib.load('phishing_model.joblib')

def is_phishing(url, model):
    # Fetch the content of the URL
    req_check = requests.get(url)
    # Create a dataframe with the features
    df = pd.DataFrame({'having_IP_Address': [0], 'URL_Length': [len(url)], 'Shortining_Service': [0], 'having_At_Symbol': [0], 'double_slash_redirecting': [0], 'Prefix_Suffix': [0], 'having_Sub_Domain': [0], 'SSLfinal_State': [0], 'Domain_registeration_length': [0], 'Favicon': [0], 'port': [0], 'HTTPS_token': [0], 'Request_URL': [0], 'URL_of_Anchor': [0], 'Links_in_tags': [0], 'SFH': [0], 'Submitting_to_email': [0], 'Abnormal_URL': [0], 'Redirect': [0], 'on_mouseover': [0], 'RightClick': [0], 'popUpWidnow': [0], 'Iframe': [0], 'age_of_domain': [0], 'DNSRecord': [0], 'web_traffic': [0], 'Page_Rank': [0], 'Google_Index': [0], 'Links_pointing_to_page': [0], 'Statistical_report': [0]})
    # Make predictions on the test set
    y_pred = model.predict(df)
    # Return True if the URL is a phishing link, and False otherwise
    return y_pred[0] == 1


url_to_check = "https://thintry.com"
result = is_phishing(url_to_check, model)
print(f'The URL "{url_to_check}" is phishing: {result}')
