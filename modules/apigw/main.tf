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
  http_method   = var.method
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "example_integration" {
  rest_api_id             = aws_api_gateway_rest_api.example_api.id
  resource_id             = aws_api_gateway_resource.example_resource.id
  http_method             = aws_api_gateway_method.example_method.http_method
  type                    = "AWS_PROXY"
  integration_http_method = "POST"
  uri             = var.lambda_integration_uri

  
  request_parameters = {
    "integration.request.header.Content-Type" = "'application/json'"
  }
}

# resource "aws_api_gateway_method" "example_method_post" {
#   rest_api_id   = aws_api_gateway_rest_api.example_api.id
#   resource_id   = aws_api_gateway_resource.example_resource.id
#   http_method   = "POST"
#   authorization = "NONE"
# }

# resource "aws_api_gateway_integration" "example_integration_post" {
#   rest_api_id             = aws_api_gateway_rest_api.example_api.id
#   resource_id             = aws_api_gateway_resource.example_resource.id
#   http_method             = aws_api_gateway_method.example_method_post.http_method
#   type                    = "AWS_PROXY"
#   integration_http_method = "POST"
#   uri             = var.lambda_integration_uri

  
#   request_parameters = {
#     "integration.request.header.Content-Type" = "'application/json'"
#   }
# }

resource "aws_api_gateway_method" "example_method_options" {
  rest_api_id   = aws_api_gateway_rest_api.example_api.id
  resource_id   = aws_api_gateway_resource.example_resource.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "example_integration_options" {
  rest_api_id             = aws_api_gateway_rest_api.example_api.id
  resource_id             = aws_api_gateway_resource.example_resource.id
  http_method             = aws_api_gateway_method.example_method_options.http_method
  integration_http_method = aws_api_gateway_method.example_method_options.http_method
  type                    = "MOCK"
}



resource "aws_lambda_permission" "apigw_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "arn:aws:execute-api:us-east-1:824206024463:${aws_api_gateway_rest_api.example_api.id}/*/${aws_api_gateway_method.example_method.http_method}${aws_api_gateway_resource.example_resource.path}"
}

resource "aws_api_gateway_deployment" "example" {
  rest_api_id = aws_api_gateway_rest_api.example_api.id
  triggers = {
    redeployment = sha1(jsonencode(aws_api_gateway_rest_api.example_api.body))
  }
  lifecycle {
    create_before_destroy = true
  }
  depends_on = [aws_api_gateway_method.example_method, aws_api_gateway_integration.example_integration]
}

# resource "aws_api_gateway_deployment" "this" {
#   depends_on  = [aws_api_gateway_integration.example_integration]
#   rest_api_id = aws_api_gateway_rest_api.example_api.id
#   stage_name  = var.api_stage_name

#   lifecycle {
#     create_before_destroy = true
#   }
# }
resource "aws_api_gateway_stage" "this" {
  deployment_id = aws_api_gateway_deployment.example.id
  rest_api_id   = aws_api_gateway_rest_api.example_api.id
  stage_name    = var.api_stage_name
}
