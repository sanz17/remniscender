import googleapiclient.discovery
import pickle
from datetime import datetime, timedelta
from google_auth_oauthlib.flow import InstalledAppFlow

service = googleapiclient.discovery.build('calendar', 'v3', developerKey='AIzaSyChufM97syuI2GNwGtTDEBG65njEzJkTSU')
#f=google_auth_oauthlib.flow.InstalledAppFlow()

scopes = ['https://www.googleapis.com/auth/calendar']
flow = InstalledAppFlow.from_client_secrets_file("client_secret.json", scopes=scopes)
credentials = flow.run_console()

pickle.dump(credentials, open("token.pkl", "wb"))
credentials = pickle.load(open("token.pkl", "rb"))
s = service("calendar", "v3", credentials=credentials)