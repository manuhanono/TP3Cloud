locals {
  objects = [for file in fileset("web/", "**/*.html") : {
    key          = file
    source       = "web/${file}"
    etag         = filemd5("web/${file}")
    content_type = "text/html"
  }]
}