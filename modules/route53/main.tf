resource "aws_route53_zone" "route53_zone" {
  name = "find-the-fing-movie.com"
}

# resource "aws_route53_record" "A" {
#     name    = "website.find-the-fing-movie.com"
#     type    = "A"
#     zone_id = aws_route53_zone.route53_zone.id

#   alias {
#     name                   = var.cdn
#     zone_id                = "Z2FDTNDATAQYW2"
#     evaluate_target_health = true
#   }
# }


resource "aws_acm_certificate" "certificate" {
  domain_name               = "find-the-fing-movie.com"
  subject_alternative_names = ["*.find-the-fing-movie.com"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_dns" {
  for_each = {
    for robo in aws_acm_certificate.certificate.domain_validation_options : robo.domain_name => {
      name   = robo.resource_record_name
      record = robo.resource_record_value
      type   = robo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.route53_zone.zone_id
}

# resource "aws_acm_certificate_validation" "certificate" {
#   certificate_arn         = aws_acm_certificate.certificate.arn
#   validation_record_fqdns = [for record in aws_route53_record.cert_dns : record.fqdn]
# }