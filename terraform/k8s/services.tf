resource "kubernetes_service_v1" "app_master" {
  wait_for_load_balancer = false

  metadata {
    name = "app-master"
  }

  spec {
    selector = {
      app = "hm-app"
    }

    port {
      name        = "http"
      port        = 80
      target_port = 8080
    }

    port {
      name        = "db-port"
      port        = 3306
      target_port = 3306
    }

    port {
      name        = "app-port"
      port        = 8080
      target_port = 8080
    }

    type = "LoadBalancer"
  }
}
