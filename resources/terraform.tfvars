vpc_name             = "main-vpc"
vpc_cidr             = "10.0.0.0/16"
website_name         = "tp-final-cloud-movies-g03"
availability_zones   = ["us-east-1a", "us-east-1b"]
public_subnet_count  = 1
private_subnet_count = 2
role                 = "arn:aws:iam::824206024463:role/LabRole"
api_name             = "APIGW-G05"
api_description      = "APIGW para la función Lambda, TP3 del G05"
resource_path        = "myresource"
api_stage_name       = "dev"
vpc_endpoints = {
  dynamodb = {
    service_name  = "com.amazonaws.us-east-1.dynamodb"
    endpoint_name = "dynamodb-vpc-endpoint"
  }
}
read_capacity  = 5
write_capacity = 5

tables = [{
  name           = "movies"
  hash_key       = "id"
  range_key      = "Nombre"
  # billing_mode   = "PROVISIONED"
  # read_capacity  = var.read_capacity
  # write_capacity = var.write_capacity

  attributes = [
    {
      name = "id"
      type = "N"
    },
    {
      name = "Nombre"
      type = "S"
    }
    # ,
    #     {
    #   name = "Género"
    #   type = "S"
    # }
  ]
    global_secondary_indexes = [
    {
      name               = "GeneroIndex"
      hash_key           = "Nombre"
      range_key          = ""
      projection_type    = "ALL"
#      non_key_attributes = ["id, Género"]
    }
  ]
}, 
{
  name           = "users"
  hash_key       = "id"
  range_key      = "mail"
  attributes = [{
      name = "id"
      type = "S"
    },
    {
      name = "mail"
      type = "S"
    },
        {
      name = "Género"
      type = "S"
    }]
    global_secondary_indexes = [{
      name               = "GeneroIndex"
      hash_key           = "id"
      range_key          = "Género"
      projection_type    = "ALL"
 #     non_key_attributes = ["Nombre"]
    }]
}, 
{
  name           = "forum"
  hash_key       = "id"
  range_key      = "Canal"
  attributes = [{
      name = "id"
      type = "S"
    },
    {
      name = "Canal"
      type = "S"
    },
        {
      name = "Género"
      type = "S"
    }]
    global_secondary_indexes = [
    {
      name               = "GeneroIndex"
      hash_key           = "id"
      range_key          = "Género"
      projection_type    = "ALL"
 #     non_key_attributes = ["Nombre"]
    }]
}
]


lambda_functions = [{
  name        = "getMovies"
  description = "Trae el contenido de TMDB"
  handler     = "getMovies.lambda_handler"
  runtime     = "python3.8"
  source_path = "python/getMovies.py"
},
{
  name        = "updateUser"
  description = "Actualiza la base cuando se autentica un usuario"
  handler     = "updateUser.lambda_handler"
  runtime     = "python3.8"
  source_path = "python/updateUser.py"
},
{
  name        = "searchBar"
  description = "Busca la data de las peliculas en DynamoDB para la barra de search"
  handler     = "searchBar.lambda_handler"
  runtime     = "python3.8"
  source_path = "python/searchBar.py"
},
{
  name        = "getCont"
  description = "Busca la data de las peliculas en DynamoDB"
  handler     = "getCont.lambda_handler"
  runtime     = "python3.8"
  source_path = "python/getCont.py"
},
{
  name        = "voteFav"
  description = "Permite votar favoritos al usuario y almacenar la informacion en DynamoDB"
  handler     = "voteFav.lambda_handler"
  runtime     = "python3.8"
  source_path = "python/voteFav.py"
},
{
  name        = "comentFav"
  description = "Busca la data de las peliculas en DynamoDB"
  handler     = "comentFav.lambda_handler"
  runtime     = "python3.8"
  source_path = "python/comentFav.py"
}
]

