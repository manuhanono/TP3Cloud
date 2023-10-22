module "api_gateway_example" {
  source                 = "../modules/apigw"
  api_name               = var.api_name
  api_description        = var.api_description
  resource_path          = var.resource_path
  api_stage_name         = var.api_stage_name
  lambda_integration_uri = module.lambda[0].lambda_function_invoke_arn

}
