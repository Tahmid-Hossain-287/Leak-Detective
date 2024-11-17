from rest_framework import serializers
from app_leak_detective.models import WaterData

class WaterDataSerializer(serializers.ModelSerializer):
	class Meta:
		model = WaterData
		fields = ['distance', 'timestamp',]