module "route53" {
  source       = "../modules/route53"
  cdn = module.cloudfront.cloudfront_domain_name
  cdn_zone = module.cloudfront.cloudfront_domain_zone_name
}