module "lambda" {
  count  = length(var.lambda_functions)
  source = "terraform-aws-modules/lambda/aws"

  function_name          = var.lambda_functions[count.index].name
  description            = var.lambda_functions[count.index].description
  handler                = var.lambda_functions[count.index].handler
  runtime                = var.lambda_functions[count.index].runtime
  source_path            = var.lambda_functions[count.index].source_path
  create_role            = false
  lambda_role            = "arn:aws:iam::824206024463:role/LabRole"
  vpc_subnet_ids         = module.vpc.private_subnets_id["1"]
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  #  attach_network_policy  = var.attach_network_policy

}