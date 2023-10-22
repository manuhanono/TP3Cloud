resource "aws_api_gateway_rest_api" "example_api" {
  name        = var.api_name
  description = var.api_description
}

resource "aws_api_gateway_resource" "example_resource" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  parent_id   = aws_api_gateway_rest_api.example_api.root_resource_id
  path_part   = var.resource_path
}

resource "aws_api_gateway_method" "example_method" {
  rest_api_id   = aws_api_gateway_rest_api.example_api.id
  resource_id   = aws_api_gateway_resource.example_resource.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "example_integration" {
  rest_api_id             = aws_api_gateway_rest_api.example_api.id
  resource_id             = aws_api_gateway_resource.example_resource.id
  http_method             = aws_api_gateway_method.example_method.http_method
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri                     = var.lambda_integration_uri
}

resource "aws_api_gateway_deployment" "this" {
  depends_on  = [aws_api_gateway_integration.example_integration]
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  stage_name  = var.api_stage_name

  lifecycle {
    create_before_destroy = true
  }
}
resource "aws_api_gateway_stage" "this" {
  deployment_id = aws_api_gateway_deployment.this.id
  rest_api_id   = aws_api_gateway_rest_api.example_api.id
  stage_name    = var.api_stage_name
}