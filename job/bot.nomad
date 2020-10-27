job "bott" {
  datacenters = ["dc1"]

  group "polica" {
    task "nodejs" {
      env {
        POLICA_BOT_TOKEN = "<POLICA_BOT_TOKEN>"
      }
      driver = "docker"
      config {
        image = "kaykelins/polica-bot:<GIT_COMMIT>"
      }
      resources {
        cpu    = 500
        memory = 256
      }
    }
  }
}
