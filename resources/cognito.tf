module "cognito" {
  source       = "../modules/cognito"
  userpool = "my-userpool"
  userpool_client = "my-client"
  userpool_domain = "dominioparacrearusuarios12345"
  callback_url = module.cloudfront.cloudfront_domain_name
}