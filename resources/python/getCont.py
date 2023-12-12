import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.client('dynamodb')
    table_name = 'movies'  # Reemplaza con el nombre de tu tabla en DynamoDB

    try:
        response = dynamodb.scan(
            TableName=table_name,
            ProjectionExpression='Nombre'  # Obtener solo el atributo 'Nombre'
        )

        # Utiliza un conjunto para almacenar nombres únicos de películas
        nombres_unicos = set()
        for item in response['Items']:
            nombre_pelicula = item.get('Nombre', {}).get('S')
            if nombre_pelicula:
                nombres_unicos.add(nombre_pelicula)

        peliculas = list(nombres_unicos)

        return {
            'statusCode': 200,
            'body': json.dumps({'peliculas': peliculas}),
            'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            'Content-Type': 'application/json'
        }
        }

    except Exception as e:
        print(f'Error al obtener nombres de películas: {e}')
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
