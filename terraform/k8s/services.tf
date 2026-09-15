resource "kubernetes_service" "app-master" {
    metadata {
        name = "app-master"
    }

    spec {
        selector = {
          app  = "iotOnGolang"
        }
        port {
            name        = "http"
            port        = 80
            target_port = #DefaultPort()
        }

#Expose_K8_Ports()

        type = ""
    }
  
}
