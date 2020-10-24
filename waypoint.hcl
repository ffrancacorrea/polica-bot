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
        tag = "1"
        encoded_auth = filebase64("./secret.json")
      }
    }
  }

  deploy { 
    use "docker" {}
  }
}
