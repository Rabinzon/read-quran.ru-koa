USER = "$(shell id -u):$(shell id -g)"

development-setup-env:
	ansible-playbook ansible/development.yml -i ansible/development

app: app-down
	docker-compose up

app-build:
	docker-compose build --user=$(USER)

app-bash:
	docker-compose run app bash

app-setup: development-setup-env app-build

app-down:
	docker-compose down

app-lint:
	make lint --directory services/app

app-test:
	docker-compose -f services/app/docker-compose.test.yml run app

app-test-update:
	docker-compose -f services/app/docker-compose.test.yml run app make test-update

production-setup:
	ansible-playbook ansible/site.yml -i ansible/production -u ubuntu -vv

production-deploy:
	ansible-playbook ansible/deploy.yml -i ansible/production -u ubuntu -vv

production-deploy-app:
	ansible-playbook --tags "app, env" ansible/deploy.yml -i ansible/production -u ubuntu -vv
