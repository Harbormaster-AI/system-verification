resource "kubernetes_service" "app-master" {
  metadata {
    name = "app-master"
  }

  spec {
    selector = {
      app  = "WealthManagementonspringboot35"
    }

    port {
      name        = "http"
      port        = 80
      target_port = 8081    }



    port {
      name        = "db-port"
      port        = 3306
      target_port = 3306
    }


    port {
      name        = "app-port"
      port        = 8081      target_port = 8081    }


    type = "LoadBalancer"
  }
  
}
