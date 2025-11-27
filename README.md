🚀 Microservices Kubernetes Deployment — DevOps Assignment
📌 Overview

This project demonstrates deployment of a Node.js microservices architecture on Azure Kubernetes Service (AKS) using Azure Container Registry (ACR).

🧱 Services Included
Service	Port	Purpose
user-service	3001	Returns sample list of users
order-service	3002	Returns order details
api-gateway	    3000	Acts as API Gateway – routes requests to backend services

Each service runs as a separate container image stored in Azure Container Registry.

🏗️ Architecture
Client → API Gateway Service → (User-Service + Order-Service)
                             ↳ Azure AKS Cluster (1 Node)
                             ↳ Azure Load Balancer (User-Service only for testing)


Communication inside cluster uses ClusterIP services.
External access enabled via port-forward or via a LoadBalancer service.

☁️ Azure Resources Used
Resource	Name	Notes
Resource Group	rg-devops-assgn	All infra stored here
AKS Cluster	aks-devops-assgn	Kubernetes deployment
ACR	mydevopsdemo01	Stores Docker images
🔧 Build & Push Images to ACR

Login and attach ACR to AKS:

az login
az acr login -n mydevopsdemo01
az aks update -g rg-devops-assgn -n aks-devops-assgn --attach-acr mydevopsdemo01


Build & push each service:

docker build -t mydevopsdemo01.azurecr.io/user-service:v1 ./user-service
docker push mydevopsdemo01.azurecr.io/user-service:v1

docker build -t mydevopsdemo01.azurecr.io/order-service:v1 ./order-service
docker push mydevopsdemo01.azurecr.io/order-service:v1

docker build -t mydevopsdemo01.azurecr.io/api-gateway:v1 ./api-gateway
docker push mydevopsdemo01.azurecr.io/api-gateway:v1

🚢 Deploy to AKS
kubectl apply -f k8s/


Verify deployment:

kubectl get pods
kubectl get svc
kubectl get endpoints


Expected output (example):

api-gateway     Running
user-service    Running
order-service   Running

🌍 Access the Application

Expose API Gateway using port-forward:

kubectl port-forward deployment/api-gateway 8081:3000


Test services:

curl http://localhost:8081/health
curl http://localhost:8081/users
curl http://localhost:8081/orders


Expected responses:

{"status":"ok","service":"api-gateway"}
[{"id":1,"name":"Alice"}]
[{"id":1,"userId":1,"product":"Book"}]

📦 Kubernetes Manifests Included

Located in /k8s/:

user-service.yaml
order-deployment.yaml
api-gateway-deployment.yaml
ingress.yaml (optional)


Each file defines:
✔ Deployment
✔ ClusterIP / LoadBalancer Service
✔ Image Pull Policy
✔ Ports & labels

🔍 Future Enhancements (Optional / Bonus)

Add Ingress Nginx with DNS

Add PostgreSQL + Secrets

Automate deployments via GitHub Actions (CI/CD) → already initialized in repo

Implement Horizontal Pod Autoscaling

🧹 Cleanup
kubectl delete -f k8s/
az group delete -n rg-devops-assgn --yes

🏁 Final Result:

✔️ 3 Microservices deployed
✔️ Docker + ACR + AKS integrated
✔️ Internal service-to-service communication works
✔️ API gateway validated via port-forward tests

If you'd like, I can also create:

✅ Architecture diagram (PNG)
✅ Presentation slide (3–4 pages)
✅ CI/CD workflow fix
✅ Add screenshots automatically (like your terminal captures)