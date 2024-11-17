from rest_framework.views import APIView
from rest_framework.response import Response
import random
import time
from .models import WaterData
from .serializers import WaterDataSerializer
from django.utils import timezone

# class WaterLeakageDataView(APIView):
#     def get(self, request):
#         # Simulate sensor data
#         leak_data = {
#             'timestamp': int(time.time()),
#             'pressure': round(random.uniform(0.5, 5.0), 2),
#             'flow_rate': round(random.uniform(0.1, 2.0), 2),
#             'leak_detected': random.choice([True, False]),
#             'leak_severity': random.choice(['None', 'Low', 'Medium', 'High'])
#         }
#         return Response(leak_data)



class WaterLeakageDataView(APIView):
    def get(self, request):
        # Simulate sensor data
        water_data = WaterData.objects.create(
            distance=round(random.uniform(0.1, 10.0), 2),
            timestamp=timezone.now(),
        )
        
        serializer = WaterDataSerializer(water_data)
        return Response(serializer.data)

    def post(self, request):
        serializer = WaterDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)