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
api_stage_name       = "dev3"
vpc_endpoints = {
  dynamodb = {
    service_name  = "com.amazonaws.us-east-1.dynamodb"
    endpoint_name = "dynamodb-vpc-endpoint"
  }
}
read_capacity  = 5
write_capacity = 5
tables = {
  forum = "forum",
  users = "users",
  movies = "movies"
}
lambda_functions = [{
  name        = "getMovies"
  description = "Trae el contenido de TMDB"
  handler     = "index.lambda_handler"
  runtime     = "python3.8"
  source_path = "python/getMovies.py"
},
{
  name        = "getCont"
  description = "Trae el contenido de DynamoDB a la página"
  handler     = "index.lambda_handler"
  runtime     = "python3.8"
  source_path = "python/getCont.py"
},
{
  name        = "comentFav"
  description = "Permite comentar y almacenar en DynamoDB"
  handler     = "index.lambda_handler"
  runtime     = "python3.8"
  source_path = "python/comentFav.py"
},
{
  name        = "searchBar"
  description = "Busca el contenido en DynamoDB y lo refleja en el sitio"
  handler     = "index.lambda_handler"
  runtime     = "python3.8"
  source_path = "python/searchBar.py"
},
{
  name        = "voteFav"
  description = "Opina sobre el contenido y se almacena en DynamoDB"
  handler     = "index.lambda_handler"
  runtime     = "python3.8"
  source_path = "python/voteFav.py"
},
{
  name        = "redirCont"
  description = "Trae el contenido de TMDB"
  handler     = "index.lambda_handler"
  runtime     = "python3.8"
  source_path = "python/redirCont.py"
}
]

