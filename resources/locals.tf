locals {
  objects = [for file in fileset("web/", "**/*.html") : {
    key          = file
    source       = "web/${file}"
    etag         = filemd5("web/${file}")
    content_type = "text/html"
  }]

  objects2 = [for file in fileset("web/js", "**/*.js") : {
    key          = file
    source       = "web/js/${file}"
    etag         = filemd5("web/js/${file}")
    content_type = "app/js"
  }]
}

