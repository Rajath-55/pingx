#!/bin/sh

build_client() {
	  echo "building client"
	  cd web-client
	  yarn build
	  cd ../
	  echo "client built"
}

commit() {
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

push() {
	echo "pushing to github repository"
	git push httpsorigin master
	echo "pushed to github repository"
	echo "pushing to heroku repository"
	cd server/
	git push heroku master
	echo "pushed to heroku repository"
}

fuck_you() {
	echo "fuck you $1"
}

full_push() {
	build_client
	commit "$1"
	heroku_commit
	push
}

case "$1" in
    "") ;;
    build_client) "$@"; exit;;
    commit) "$@"; exit;;
    heroku_commit) "$@"; exit;;
    push) "$@"; exit;;
    fuck_you) "$@"; exit;;
    *) log_error "Unkown function: $1()"; exit 2;;
esac
