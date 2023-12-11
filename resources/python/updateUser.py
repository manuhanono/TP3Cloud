import boto3
from datetime import datetime

def lambda_handler(event, context):
    print(event)

    date = datetime.now()

    table_name = "users"
    region = "us-east-1"

    dynamodb = boto3.client('dynamodb', region_name=region)

    # Si los parámetros requeridos están presentes, procede
    if 'sub' in event['request']['userAttributes']:
        # Escribe datos en DDB
        dynamodb_params = {
            'Item': {
                'id': {'S': event['request']['userAttributes']['sub']},
                'username': {'S': event['userName']},
                'mail': {'S': event['request']['userAttributes']['email']},
                'createdAt': {'S': date.isoformat()},
            },
            'TableName': table_name
        }
        try:
            dynamodb.put_item(**dynamodb_params)
            print("Success")
        except Exception as e:
            print("Error", e)

        print("Success: Everything executed correctly")
        return event

    else:
        print("Error: Nothing was written to DDB")
        return event