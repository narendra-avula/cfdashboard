import requests
from DashBoard.settings import ZOHO_CRM_AUTH_TOKEN
from Utils.constants import ZOHO_CRM_URLS


def get_url():
    url_dict = dict()
    auth_token = ZOHO_CRM_AUTH_TOKEN
    url_dict['request_url'] = ZOHO_CRM_URLS.get("GET").get("Leads")+"/getRecords"
    url_dict['params'] = {'authtoken': auth_token, 'scope': "crmapi", 'newFormat': 2,
              'selectColumns': "Leads(Lead Owner,First Name,Last Name,Email,Created Time,Modified Time)",
              'lastModifiedTime': "2016-02-14 00:00:00",'fromIndex':1,'toIndex':200}
    return url_dict


def main():
    url_dict = get_url()
    api_request = requests.get(url=url_dict.get("request_url"), params=url_dict.get("params"))
    api_request.raise_for_status()
    api_response = api_request.json()
    if api_response['response'].get("nodata")==None:
       ZohoRetrival(api_response).get_details_from_zoho()
    pass

class ZohoRetrival:
    def __init__(self,zoho_json_data):
        self.zoho_data = zoho_json_data

    def get_details_from_zoho(self):
        self.get_today_leads()
        pass

    def get_today_leads(self):
          # for doc in self.zoho_data['response']['result']['Leads']['row']:
       pass



if __name__ == "__main__":
    main()