__author__ = 'NarendraAvula'

from django.shortcuts import render,HttpResponse,Http404
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
from ZohoManagement.today_leads import process_zoho_data

def get_leads_dashboard(request):
    return render(request, "dashboard.html")


def open_home_page(request):
    return render(request, "home.html")


def fetch_crm_report(request):
    if request.is_ajax() and request.POST:
        selected_date = request.POST.get('date')
        zoho_response = process_zoho_data(selected_date)
        return HttpResponse(json.dumps(zoho_response), content_type="application/json")
    else:
        raise Http404