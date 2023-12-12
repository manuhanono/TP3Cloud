import boto3
import json
from datetime import datetime

dynamodb = boto3.client('dynamodb')
table_name = 'forum' 

def lambda_handler(event, context):
    try:
        body = json.loads(event['body'])
        
        # Obtiene el comentario y el canal del cuerpo de la solicitud
        username = body.get('username')
        message = body.get('message')
        channel = body.get('Canal')
        puntaje = body.get('Puntaje')

        # Verifica si tanto el comentario como el canal están presentes
        if not (username and message and channel):
            raise ValueError('Username, message, and channel are required fields.')

        # Obtiene la marca de tiempo actual
        timestamp = int(datetime.now().timestamp())

        # Almacena el comentario en DynamoDB
        dynamodb.put_item(
            TableName=table_name,
            Item={
                'id': {'S': str(timestamp)},  # Puedes ajustar esto según tus necesidades
                'username': {'S': username},
                'timestamp': {'N': str(timestamp)},
                'Comentario': {'S': message},
                'Canal': {'S': channel},
                'Puntaje': {'N': puntaje}
            }
        )

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Comentario agregado exitosamente'}),
            'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            'Content-Type': 'application/json'
        }
        }

    except Exception as e:
        print(f'Error: {e}')
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f'Error: {str(e)}'}),
            'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            'Content-Type': 'application/json'
        }
        }
