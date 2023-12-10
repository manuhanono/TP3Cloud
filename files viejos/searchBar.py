import json
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'movies'

def lambda_handler(event, context):
    try:
        # Extraer el término de búsqueda del evento
        search_term = event['queryStringParameters']['query']

        # Parámetros de consulta para DynamoDB
        params = {
            'TableName': table_name,
            'IndexName': 'NombreDelIndice',  # Si tienes un índice que facilita la búsqueda
            'KeyConditionExpression': 'titulo CONTAINS :term',  # Modifica según tu esquema de DynamoDB
            'ExpressionAttributeValues': {
                ':term': search_term.lower()
            }
        }

        # Realizar la búsqueda en DynamoDB
        results = buscar_en_dynamodb(params)

        # Retornar resultados
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
            },
            'body': json.dumps(results)
        }
    except Exception as e:
        print('Error al buscar en DynamoDB:', str(e))
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Error al buscar en DynamoDB'})
        }

def buscar_en_dynamodb(params):
    # Implementa la lógica de búsqueda en DynamoDB aquí
    # Usa la variable "dynamodb" para interactuar con la tabla DynamoDB
    # Retorna los resultados de la búsqueda
    table = dynamodb.Table(params['TableName'])
    response = table.query(**params)
    return response.get('Items', [])

