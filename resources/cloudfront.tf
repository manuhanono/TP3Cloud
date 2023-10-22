module "cloudfront" {
  source       = "../modules/cloudfront"
  website_name = module.website.domain_name
  bucket_name  = "static"
}