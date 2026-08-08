resource "kubernetes_replication_controller" "app-master" {
  metadata {
    name = "app-master"
  }

  spec {
    replicas = 1

    selector = {
      app  = "WealthManagementongolang"
    }
    template {        
    template {
      container {
        image = "mysql:latest"
        name  = "db-container"

        port {
          container_port = 3306
        }

        resources {
          requests {
            cpu    = "100m"
            memory = "100Mi"
          }
        }

        
      container {
        image = "theharbormaster/WealthManagement-on-golang:latest
"
        name  = "app-container"

        port {
          container_port = 4000        }
      MYSQL_USER: root
      MYSQL_PASSWORD: letmein2
      MYSQL_ALLOW_EMPTY_PASSWORD: yes
      MYSQL_ROOT_PASSWORD:  letmein2
      MYSQL_DATABASE: appDB
        resources {
          requests {
            cpu    = "100m"
            memory = "100Mi"
          }
        }

      }

    }
    }
  }
}