from django.urls import path
from .views import WaterLeakageDataView

urlpatterns = [
    path('api/leak-data/', WaterLeakageDataView.as_view(), name='leak_data'),
    # path('api/', WaterLeakageDataView.as_view()),
]