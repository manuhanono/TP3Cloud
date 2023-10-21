module "cloudfront" {
  source       = "../modules/cloudfront"
  website_name = module.website.domain_name
  bucket_name  = "static"
  #module.website.bucket_id
  apigw_invoke_url = module.api_gateway_example.invoke_url
  apigw_base_path  = "myresource"
  apigw_stage      = "dev2"
}