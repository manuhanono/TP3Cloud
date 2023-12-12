module "api_gateway_example" {
  source                 = "../modules/apigw"
  api_name               = var.api_name
  api_description        = var.api_description
  resource_path          = var.resource_path
  api_stage_name         = var.api_stage_name
  method = "GET"
  lambda_integration_uri = module.lambda["2"].lambda_function_invoke_arn
  lambda_function_name = module.lambda["2"].lambda_function_name
 // lambda_integration_uri = module.lambda[0].lambda_function_invoke_arn

}

module "api_gateway_example2" {
  source                 = "../modules/apigw"
  api_name             = "APIGW-getComent"
  api_description      = "APIGW para getComent"
  resource_path          = var.resource_path
  api_stage_name         = var.api_stage_name
    method = "GET"
  lambda_integration_uri = module.lambda["6"].lambda_function_invoke_arn
  lambda_function_name = module.lambda["6"].lambda_function_name
 // lambda_integration_uri = module.lambda[0].lambda_function_invoke_arn

}

module "api_gateway_example3" {
  source                 = "../modules/apigw"
  api_name             = "APIGW-getCont"
  api_description      = "APIGW para getCont"
  resource_path          = var.resource_path
  api_stage_name         = var.api_stage_name
    method = "GET"

  lambda_integration_uri = module.lambda["3"].lambda_function_invoke_arn
  lambda_function_name = module.lambda["3"].lambda_function_name
 // lambda_integration_uri = module.lambda[0].lambda_function_invoke_arn

}

module "api_gateway_example4" {
  source                 = "../modules/apigw"
  api_name             = "APIGW-comentFav"
  api_description      = "APIGW para comentFav"
  resource_path          = var.resource_path
  api_stage_name         = var.api_stage_name
    method = "POST"

  lambda_integration_uri = module.lambda["5"].lambda_function_invoke_arn
  lambda_function_name = module.lambda["5"].lambda_function_name
 // lambda_integration_uri = module.lambda[0].lambda_function_invoke_arn

}

# module "api_gateway_example" {
#   count       = length(var.api_gateways)
#   source                 = "../modules/apigw"
#   api_name               = var.api_gateways[count.index].api_name
#   api_description        = var.api_gateways[count.index].api_description
#   resource_path          = var.api_gateways[count.index].resource_path
#   api_stage_name         = var.api_gateways[count.index].api_stage_name
#   lambda_integration_uri = module.lambda["2"].lambda_function_invoke_arn
#   lambda_function_name = module.lambda["2"].lambda_function_name

# }