variable "location" {
  description = "Azure region"
  default     = "centralindia"
}


variable "resource_group_name" {
  description = "Name of the resource group"
  default     = "rg-devops-assgn"
}

variable "acr_name" {
  description = "Name of the Azure Container Registry (must be globally unique)"
  default     = "mydevopsdemo01" # <- change this to your unique ACR name
}

variable "aks_name" {
  description = "Name of the AKS cluster"
  default     = "aks-devops-assgn"
}

variable "postgres_name" {
  description = "Name of the PostgreSQL Flexible Server"
  default     = "pg-devops-assgn"
}

variable "kv_name" {
  description = "Name of the Key Vault"
  default     = "kv-devops-assgn"
}

variable "pg_admin" {
  description = "PostgreSQL admin username"
  default     = "pgadmin"
}

variable "pg_password" {
  description = "PostgreSQL admin password (use Key Vault / secret in real-world)"
  default     = "StrongPass123!"
}
