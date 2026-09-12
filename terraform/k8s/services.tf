resource "kubernetes_service" "app-master" {
    metadata {
        name = "app-master"
    }

    spec {
        selector = {
          app  = "bankingonrails"
        }
        port {
            name        = "http"
            port        = 80
            target_port = 3000
        }

        port {
            name        = "db-port"
            port        = 
            target_port = 
        }

        port {
            port        = 3000
            target_port = 3000
            name        = "app-port"
        }

        type = ""
    }
  
}
