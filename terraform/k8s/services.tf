resource "kubernetes_service" "app-master" {
    metadata {
        name = "app-master"
    }

    spec {
        selector = {
          app  = "iotOnDjango"
        }
        port {
            name        = "http"
            port        = 80
            target_port = 8080        }

        port {
            name        = "db-port"
            port        = 
            target_port = 
        }

        port {
            port        = 8080            target_port = 8080            name        = "app-port"
        }

        type = ""
    }
  
}
