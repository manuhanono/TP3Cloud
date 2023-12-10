module "dynamodb" {
  count       = length(var.tables)
  source         = "terraform-aws-modules/dynamodb-table/aws"
  
  name           = var.tables[count.index].name
  hash_key       = var.tables[count.index].hash_key
  range_key      = var.tables[count.index].range_key
  # billing_mode   = "PROVISIONED"
  # read_capacity  = var.read_capacity
  # write_capacity = var.write_capacity

  attributes = var.tables[count.index].attributes
  global_secondary_indexes = var.tables[count.index].global_secondary_indexes

  tags = {
    Terraform   = "true"
    Environment = "staging"
  }

}