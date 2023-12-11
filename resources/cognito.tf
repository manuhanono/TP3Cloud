module "cognito" {
  source       = "../modules/cognito"
  userpool = "my-userpool"
  userpool_client = "my-client"
  userpool_domain = "dominioparacrearusuarios12345"
  callback_url = module.cloudfront.cloudfront_domain_name
#  lambda_arn = module.lambda["1"].lambda_function_arn
}