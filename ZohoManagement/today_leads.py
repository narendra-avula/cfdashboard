import requests
from DashBoard.settings import ZOHO_CRM_AUTH_TOKEN
from Utils.constants import ZOHO_CRM_URLS
from collections import defaultdict


def get_url(today_date):
    url_dict = dict()
    auth_token = ZOHO_CRM_AUTH_TOKEN
    url_dict['request_url'] = ZOHO_CRM_URLS.get("GET").get("Leads")+"/getRecords"
    url_dict['params'] = {'authtoken': auth_token, 'scope': "crmapi", 'newFormat': 2,
              'selectColumns': "Leads(Lead Owner,First Name,Last Name,Email,Created Time,Modified Time,City,Lead Status)",
              'lastModifiedTime': str(today_date)+" 00:00:00",'fromIndex':1,'toIndex':200}
    return url_dict


def process_zoho_data(today_date):
    url_dict = get_url(today_date)
    api_request = requests.get(url=url_dict.get("request_url"), params=url_dict.get("params"))
    api_request.raise_for_status()
    api_response = api_request.json()
    if not api_response['response'].get("nodata"):
       return ZohoRetrival(api_response).get_details_from_zoho()

class ZohoRetrival:
    def __init__(self,zoho_json_data):
        self.zoho_data = zoho_json_data
        self.city_wise_leads = defaultdict(int)
        self.lead_status_dict = defaultdict(int)
        self.all_details= dict()

    def get_details_from_zoho(self):
        self.get_today_leads()
        self.all_details['cityReport'] = self.city_wise_leads
        self.all_details['leadStatusReport'] = self.lead_status_dict
        # self.group_by_city_names(self.all_details)
        return self.all_details

    def group_by_city_names(self, all_details):
        for key, val in all_details.iteritems():

            pass

    def get_today_leads(self):
        crm_records_list = self.zoho_data['response']['result']['Leads']['row']
        phone_nums_list = set()
        for record in crm_records_list:
            record_details = record.get('FL', "")
            for records in record_details:
                if records["val"] == "City":
                   self.city_wise_leads[records["content"]] +=1
                if records['val'] == "Lead Status":
                   self.lead_status_dict[records["content"]] +=1

