terraform {
  required_version = ">= 1.3.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">=3.0"
    }
  }
}

provider "azurerm" {
  features {}

  subscription_id = "33faab1b-0c5a-431c-afd3-aa63502f67af"
  tenant_id       = "99af5904-23ca-4b51-a11e-2e286f65128a"
}
