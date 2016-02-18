__author__ = 'NarendraAvula'

from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response


def get_leads_dashboard(request):
    return render(request, "dashboard.html")


def open_home_page(request):
    return render(request, "home.html")


@api_view(['POST'])
def fetch_crm_report(request):
    return Response({'sucess':'working'},200)