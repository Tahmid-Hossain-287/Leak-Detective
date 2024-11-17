from rest_framework.views import APIView
from rest_framework.response import Response
import random
import time

class WaterLeakageDataView(APIView):
    def get(self, request):
        # Simulate sensor data
        leak_data = {
            'timestamp': int(time.time()),
            'pressure': round(random.uniform(0.5, 5.0), 2),
            'flow_rate': round(random.uniform(0.1, 2.0), 2),
            'leak_detected': random.choice([True, False]),
            'leak_severity': random.choice(['None', 'Low', 'Medium', 'High'])
        }
        return Response(leak_data)

    # def list(self, requst):
    #     
