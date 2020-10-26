build:
	docker build -f dev.Dockerfile -t kaykelins/polica-bot:$$GITHUB_SHA . 
push:
	echo $$pass | docker login -u kaykelins --password-stdin
deploy:
	sed -i 's|<POLICA_BOT_TOKEN>|'$$POLICA_BOT_TOKEN'|g' job/bot.nomad
	sed -i 's|<GIT_COMMIT>|'$$GITHUB_SHA'|g' job/bot.nomad
	nomad job run job/bot.nomad
