import boto3
import json
from datetime import datetime

dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    operation = event['operation']  # 'get' o 'post'
    table_name = 'forum'  # Reemplaza con el nombre de tu tabla en DynamoDB
    if operation == 'get':
        # Obtener todos los comentarios ordenados por fecha
        try:            
            response = dynamodb.query(
                TableName=table_name,
                IndexName='GeneroIndex',  
                ProjectionExpression='username, message, timestamp',
                ExpressionAttributeNames={'#C': 'canal'},
                KeyConditionExpression='#C = :canal',
                ExpressionAttributeValues={
                    ':canal': {'S': 'valor_del_canal_a_buscar'}  
                },
                ScanIndexForward=False  # Orden descendente por fecha
            )
            comentarios = response.get('Items', [])

            return {
                'statusCode': 200,
                'body': json.dumps({'comentarios': comentarios}),
                'headers': {
                    'Content-Type': 'application/json',
                }
            }
        except Exception as e:
            print(f'Error al obtener comentarios: {e}')
            return {
                'statusCode': 500,
                'body': json.dumps({'error': f'Error: {str(e)}'}),
                'headers': {
                    'Content-Type': 'application/json',
                }
            }    
    elif operation == 'post':
        # Agregar un nuevo comentario
        try:
            body = json.loads(event['body'])
            username = body['username']
            message = body['message']
            timestamp = int(datetime.now().timestamp())

            # Almacena el comentario en DynamoDB
            dynamodb.put_item(
                TableName=table_name,
                Item={
                    'username': {'S': username},
                    'timestamp': {'N': str(timestamp)},
                    'message': {'S': message}
                }
            )

            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Comentario agregado exitosamente'}),
                'headers': {
                    'Content-Type': 'application/json',
                }
            }
        except Exception as e:
            print(f'Error al agregar comentario: {e}')
            return {
                'statusCode': 500,
                'body': json.dumps({'error': f'Error: {str(e)}'}),
                'headers': {
                    'Content-Type': 'application/json',
                }
            }
    else:
        return {
            'statusCode': 400,
            'body': json.dumps({'error': 'Operación no válida'}),
            'headers': {
                'Content-Type': 'application/json',
            }
        }
