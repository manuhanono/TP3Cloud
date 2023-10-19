module "logs" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  bucket_prefix = "${var.domain_name}-logs"
  acl           = "log-delivery-write"

  force_destroy = true

  attach_deny_insecure_transport_policy = true
  attach_require_latest_tls_policy      = true

  control_object_ownership = true
  object_ownership         = "ObjectWriter"

    versioning = {
    enabled = true
  }
}


module "static_site" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  bucket_prefix = "please-domain-g05-tp3-funciona"
  attach_policy = true
  policy        = data.aws_iam_policy_document.policy_static.json

  acl                      = "private"
  control_object_ownership = true
  object_ownership         = "ObjectWriter"
  block_public_acls        = true
  block_public_policy      = true
  ignore_public_acls       = true
  restrict_public_buckets  = true

  logging = {
    target_bucket = module.logs.s3_bucket_id
    target_prefix = "log/"
  }
  website = {
    index_document = "index.html"
    error_document = "error.html"
  }
}

module "www" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  bucket_prefix = "${var.domain_name}-www"
  attach_policy = true
  policy        = data.aws_iam_policy_document.policy_www.json

  acl                      = "private"
  control_object_ownership = true
  object_ownership         = "ObjectWriter"
  block_public_acls        = false
  block_public_policy      = true
  ignore_public_acls       = true
  restrict_public_buckets  = false

  website = {
    redirect_all_requests_to = {
      host_name = module.static_site.s3_bucket_bucket_regional_domain_name
    }
  }
}


data "aws_iam_policy_document" "policy_static" {
  statement {
    actions   = ["s3:GetObject"]
#    resources = ["${module.static_site.s3_bucket_arn}/*"]
    resources = [module.static_site.s3_bucket_arn]

    principals {
      type        = "AWS"
      identifiers = var.bucket_access
    }
  }
}

data "aws_iam_policy_document" "policy_www" {
  statement {
    actions   = ["s3:GetObject"]
#    resources = ["${module.www.s3_bucket_arn}/*"]
    resources = [module.www.s3_bucket_arn]

    
 #   resources = [module.static_site.s3_bucket_arn, "${module.www.s3_bucket_arn}/*"]

    principals {
      type        = "AWS"
      identifiers = var.bucket_access
    }
  }
}




    
