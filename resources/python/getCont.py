import boto3
import random
import json

def lambda_handler(event, context):
    dynamodb = boto3.client('dynamodb')
    table_name = 'movies'  # Reemplaza con el nombre de tu tabla en DynamoDB
    index_name = 'nombre_de_tu_indice_global_secundario'  # Reemplaza con el nombre de tu GSI

    try:
        # Escoge un valor aleatorio para comenzar la búsqueda en el GSI
        start_key = random.randint(1, 1000000)  # Reemplaza con un rango apropiado para tus datos

        # Realiza la consulta al GSI para obtener 4 películas aleatorias
        response = dynamodb.query(
            TableName=table_name,
            IndexName=index_name,
            KeyConditionExpression='id >= :start_key',
            ExpressionAttributeValues={':start_key': {'N': str(start_key)}},
            Limit=4
        )

        peliculas_aleatorias = response['Items']

        return {
            'statusCode': 200,
            'body': json.dumps({'peliculas_aleatorias': peliculas_aleatorias}),
            'headers': {
                'Content-Type': 'application/json',
            }
        }

    except Exception as e:
        print(f'Error al obtener películas aleatorias: {e}')
        return {
            'statusCode': 500,
            'body': json.dumps({'error': f'Error: {str(e)}'}),
            'headers': {
                'Content-Type': 'application/json',
            }
        }
