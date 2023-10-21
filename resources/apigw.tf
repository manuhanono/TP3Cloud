module "api_gateway_example" {
  source                 = "../modules/apigw"
  api_name               = "MyAPI"
  api_description        = "Description of my API"
  resource_path          = "myresource"
  lambda_integration_uri = module.lambda[0].lambda_function_invoke_arn
  api_stage_name         = "dev2"
}
