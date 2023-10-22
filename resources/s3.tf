module "website" {
  source        = "../modules/static_site"
  domain_name   = var.website_name
  bucket_access = [module.cloudfront.OAI, "arn:aws:iam::824206024463:root"]
  cloudfront_domain_name = module.cloudfront.cloudfront_domain_name
}

resource "aws_s3_object" "data" {

  count        = length(local.objects)
  bucket       = module.website.bucket_id
  key          = local.objects[count.index].key
  source       = local.objects[count.index].source
  etag         = local.objects[count.index].etag
  content_type = local.objects[count.index].content_type

}

