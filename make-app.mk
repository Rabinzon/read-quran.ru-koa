app: app-down
	docker-compose up

app-build:
	docker-compose build

app-bash:
	docker-compose run app bash

development-setup-env:
	ansible-playbook ansible/development.yml -i ansible/development

app-setup: development-setup-env app-build

app-down:
	docker-compose down

app-lint:
	make lint --directory services/app

app-test:
	make test --directory services/app

app-test-update:
	make test-update --directory services/app

production-setup:
	ansible-playbook ansible/site.yml -i ansible/production -u admin -vv

production-deploy:
	ansible-playbook ansible/deploy.yml -i ansible/production -u admin -vv

production-deploy-app:
	ansible-playbook ansible/deploy.yml -i ansible/production -u admin -vv -t app
