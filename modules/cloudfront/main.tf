data "aws_cloudfront_cache_policy" "optimized" {
  name = "Managed-CachingOptimized"
}

resource "aws_cloudfront_distribution" "this" {
  
  enabled = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100"
  
  origin {
    origin_id                = var.bucket_name
    domain_name              = var.website_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.this.cloudfront_access_identity_path
    }
  }
#   origin {
#     origin_id = var.website_name
#     domain_name = "${var.apigw_stage}_${var.apigw_base_path}"
#     origin_path = var.apigw_stage
#     custom_origin_config {
#       http_port              = 80
#       https_port             = 443
#       origin_protocol_policy = "http-only"
#       origin_ssl_protocols   = ["TLSv1.2"]
#     }
#   }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id       = var.bucket_name
    cache_policy_id        = data.aws_cloudfront_cache_policy.optimized.id
    viewer_protocol_policy = "redirect-to-https"
  }

#   ordered_cache_behavior {
#     path_pattern     = "/${var.apigw_base_path}/*"
#     target_origin_id = "${var.apigw_stage}_${var.apigw_base_path}"
#     allowed_methods  = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
#     cached_methods   = ["GET", "HEAD"]
#     cache_policy_id  = data.aws_cloudfront_cache_policy.optimized.id

#     viewer_protocol_policy = "redirect-to-https"
#     min_ttl                = 0
#     default_ttl            = 0
#     max_ttl                = 0
#     compress               = true
#   }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  
  viewer_certificate {
    cloudfront_default_certificate = true
  }
  
}

resource "aws_cloudfront_origin_access_identity" "this" {
  comment = "OAI for ${var.bucket_name}"
}
