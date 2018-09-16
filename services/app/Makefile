start:
	DEBUG="application:*" npm run nodemon -- --watch .  --ext '.js' --exec npm run gulp -- server

prepare:
	touch .bash_history
	touch .env

test:
	npm run test

test-update:
	npm run test-update

lint:
	npm run lint

check: test lint

db-create:
	npm run	sequelize db:create

db-prepare: migration-undo migrate seed

migrate:
	npm run	sequelize db:migrate --debug

migration-undo:
	npm run	sequelize db:migrate:undo:all

seed:
	npm run	sequelize db:seed:all --debug

seed-undo:
	npm run	sequelize db:undo:all --debug

re-seed: migration-undo seed-undo migrate seed

server: migrate seed
	npm run server

.PHONY: test
