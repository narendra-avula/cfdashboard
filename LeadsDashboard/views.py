__author__ = 'NarendraAvula'

from django.shortcuts import render


def get_leads_dashboard(request):
    return render(request, "dashboard.html")

def open_home_page(request):
    return render(request, "home.html")