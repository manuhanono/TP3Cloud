import boto3
import json
from datetime import datetime

dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    operation = event['operation']  # 'get' o 'post'
    table_name = 'forum'

    if operation == 'get':
        # Obtener todos los comentarios y calcular el promedio de puntuación
        try:
            response = dynamodb.scan(
                TableName=table_name,
                ProjectionExpression='username, message, id_pelicula, puntuacion, timestamp',
                ExpressionAttributeNames={'#T': 'timestamp'},
                ScanIndexForward=False  # Orden descendente por fecha
            )
            comentarios = response.get('Items', [])

            # Calcula el promedio de puntuación para cada película
            promedio_peliculas = {}
            for comentario in comentarios:
                id_pelicula = comentario.get('id_pelicula', {}).get('S')
                puntuacion = comentario.get('puntuacion', {}).get('N')

                if id_pelicula and puntuacion:
                    if id_pelicula not in promedio_peliculas:
                        promedio_peliculas[id_pelicula] = {'total': 0, 'count': 0}

                    promedio_peliculas[id_pelicula]['total'] += int(puntuacion)
                    promedio_peliculas[id_pelicula]['count'] += 1

            # Calcula el promedio final para cada película
            for id_pelicula, data in promedio_peliculas.items():
                promedio = data['total'] / data['count']
                data['promedio'] = promedio

            return {
                'statusCode': 200,
                'body': json.dumps({'comentarios': comentarios, 'promedio_peliculas': promedio_peliculas}),
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
        # Agregar un nuevo comentario y puntuación
        try:
            body = json.loads(event['body'])
            username = body['username']
            message = body['message']
            id_pelicula = body['id_pelicula']
            puntuacion = body['puntuacion']
            timestamp = int(datetime.now().timestamp())

            # Almacena el comentario y puntuación en DynamoDB
            dynamodb.put_item(
                TableName=table_name,
                Item={
                    'username': {'S': username},
                    'timestamp': {'N': str(timestamp)},
                    'message': {'S': message},
                    'id_pelicula': {'S': id_pelicula},
                    'puntuacion': {'N': str(puntuacion)}
                }
            )

            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Comentario y puntuación agregados exitosamente'}),
                'headers': {
                    'Content-Type': 'application/json',
                }
            }
        except Exception as e:
            print(f'Error al agregar comentario y puntuación: {e}')
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
