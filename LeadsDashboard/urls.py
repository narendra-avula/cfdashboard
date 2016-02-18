__author__ = 'NarendraAvula'
from django.conf.urls import url,include,patterns
from django.contrib import admin

urlpatterns = [
    url(r'^/home$', 'LeadsDashboard.views.open_home_page'),
    url(r'^/leads$', 'LeadsDashboard.views.get_leads_dashboard'),
    url(r'^/get-data$', 'LeadsDashboard.views.fetch_crm_report'),
]