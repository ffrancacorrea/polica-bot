project = "discord-bot"
app "bot-polica" {
  labels = {
    "service" = "discord-bot",
    "env" = "dev"
  }

  build {
    use "docker" {
      dockerfile = "dev.Dockerfile"	
    }
    registry {
      use "docker" {
        image = "kaykelins/polica-bot"
        tag = "test"
      }
    } 
  }

  deploy { 
    use "docker" {}
  }
}
