resource "aws_route53_zone" "route53_zone" {
  name = "find-the-fing-movie.com"
}

resource "aws_route53_record" "A" {
    name    = "find-the-fing-movie.com"
    type    = "A"
    zone_id = aws_route53_zone.route53_zone.id

  records = [
      var.cdn
  ]
}