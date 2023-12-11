module "api_gateway_example" {
  count       = length(var.api_gateways)
  source                 = "../modules/apigw"
  api_name               = var.api_gateways[count.index].api_name
  api_description        = var.api_gateways[count.index].api_description
  resource_path          = var.api_gateways[count.index].resource_path
  api_stage_name         = var.api_gateways[count.index].api_stage_name
  lambda_integration_uri = module.lambda["2"].lambda_function_invoke_arn
  lambda_function_name = module.lambda["2"].lambda_function_name

}
