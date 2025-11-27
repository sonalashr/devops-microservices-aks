// ---------- Resource Group ----------
resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

// ---------- Container Registry ----------
resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Standard"
  admin_enabled       = false
}

// ---------- Current client details ----------
data "azurerm_client_config" "current" {}


// ---------- AKS Cluster ----------
resource "azurerm_kubernetes_cluster" "aks" {
  name                = var.aks_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "devopsdemo"

  default_node_pool {
  name       = "systempool"
  node_count = 1
  vm_size    = "Standard_D2s_v3"
}


  identity {
    type = "SystemAssigned"
  }
}

// ---------- Outputs ----------
output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "aks_name" {
  value = azurerm_kubernetes_cluster.aks.name
}

output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}
