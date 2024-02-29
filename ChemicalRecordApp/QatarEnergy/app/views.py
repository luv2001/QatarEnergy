from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import ChemicalRecord
import json
from datetime import datetime, timedelta, timezone


@csrf_exempt
def insert_data(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            ChemicalRecord.objects.create(
                well=data['well'],
                service=data['service'],
                date_done=data['date_done'],
                field=data.get('field', ''),
                jacket=data.get('jacket', ''),
                supervisor=data.get('supervisor', ''),
                comments=data.get('comments', '')
            )
            return JsonResponse({'message': 'Data inserted successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


def get_all_data(request):
    if request.method == 'GET':
        data = json.loads(request.body)
        field = data.get('field')

        data = ChemicalRecord.objects.filter(field=field).values()
        return JsonResponse({'data': list(data)})
    return JsonResponse({'error': 'Invalid request method'}, status=405)


def get_data_by_filters(request):
    if request.method == 'GET':
        from_date = request.GET.get('from_date')
        to_date = request.GET.get('to_date')
        field = request.GET.get('field')
        service = request.GET.get('service')

        try:
            from_date = datetime.strptime(from_date, '%Y-%m-%d')
            to_date = datetime.strptime(to_date, '%Y-%m-%d')
        except (ValueError, TypeError):
            return JsonResponse({'error': 'Invalid date format'}, status=400)

        data = ChemicalRecord.objects.filter(
            date_done__range=[from_date, to_date],
            field=field,
            service=service
        ).values()

        return JsonResponse({'data': list(data)})
    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_due_wells(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        service = data.get('service')
        field = data.get('field')

        six_months_ago = timezone.now() - timedelta(days=180)

        try:
            due_wells = ChemicalRecord.objects.filter(
                service=service,
                field=field,
                date_done__lte=six_months_ago
            )

            result = {}

            for well in due_wells:
                due_days = (datetime.now(timezone.utc).date() - well.date_done).days
                result[well.well] = str(due_days)

            sorted_result = dict(sorted(result.items(), key=lambda x: int(x[1]), reverse=True))

            return JsonResponse({"due_wells": sorted_result})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def get_completed_data(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        from_date = data.get('from_date')
        to_date = data.get('to_date')
        field = data.get('field')
        service = data.get('service')

        result = []

        try:
            from_date = datetime.strptime(from_date, '%Y-%m-%d')
            to_date = datetime.strptime(to_date, '%Y-%m-%d')
        except (ValueError, TypeError):
            return JsonResponse({'error': 'Invalid date format'}, status=400)

        data = ChemicalRecord.objects.filter(
            date_done__range=[from_date, to_date],
            field=field,
            service=service
        )

        for well in data:
            result.append({"well": well.well, "date": well.date_done})

        return JsonResponse({'completed_wells': list(result)})
    return JsonResponse({'error': 'Invalid request method'}, status=405)
