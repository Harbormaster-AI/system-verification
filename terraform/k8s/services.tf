resource "kubernetes_service" "app-master" {
    metadata {
        name = "app-master"
    }

    spec {
        selector = {
          app  = "bankingOnSpringboot"
        }
        port {
            name        = "http"
            port        = 80
            target_port = 8080
        }

#Expose_K8_Ports()

        type = "LoadBalancer"
    }
  
}
