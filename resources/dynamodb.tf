module "dynamodb" {
  for_each       = var.tables
  source         = "terraform-aws-modules/dynamodb-table/aws"
  name           = each.value
  hash_key       = "pk"
  range_key      = "sk"
  billing_mode   = "PROVISIONED"
  read_capacity  = var.read_capacity
  write_capacity = var.write_capacity

  attributes = [
    {
      name = "pk"
      type = "S"
    },
    {
      name = "sk"
      type = "S"
    }
  ]
}