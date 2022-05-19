#!/bin/sh

build_client() {
	  echo "building client"
	  cd web-client
	  yarn build
	  cd ../
	  echo "client built"
}

gh_commit() {
	echo "committing github repository"
	git add .
	git commit -m "$1"
	echo "committed github repository"
}

heroku_commit() {
	echo "committing heroku repository"
	cd server/
	git add .
	git commit -m "updating build"
	cd ../
	echo "committed heroku repository"
}

gh_push() {
	echo "pushing to github repository"
	git push httpsorigin master
	echo "pushed to github repository"
}

heroku_push() {
	echo "pushing to heroku repository"
	cd server/
	git push heroku master
	cd ../
	echo "pushed to heroku repository"
}

update() {
	build_client
	gh_commit "$1"
	gh_push
	heroku_commit
	heroku_push
	push
}

server() {
	cd server/
	npm run dev
	cd ../
}

web() {
	cd web-client/
	yarn start
	cd ../
}

cli() {
	cd node-cli-client/
	npm run start
	cd ../
}

case "$1" in
    "") ;;
    build_client) "$@"; exit;;
    gh_commit) "$@"; exit;;
    gh_push) "$@"; exit;;
    heroku_commit) "$@"; exit;;
    heroku_push) "$@"; exit;;
    update) "$@"; exit;;
	server) "$@"; exit;;
	web) "$@"; exit;;
	cli) "$@"; exit;;
    *) log_error "Unkown function: $1()"; exit 2;;
esac
