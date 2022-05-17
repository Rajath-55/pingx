import typer
from methods import *
import asyncio
from console import console
import sys

app = typer.Typer()




@app.command()
def register(username:str):
	asyncio.run(register_user(username))
	console.print("[green]Registered user: " + username + "[/]")
	sys.exit()

@app.command()
def login(username:str):
	asyncio.run(main(username))

@app.command()
def create(room_id):
	asyncio.run(create_room(room_id = room_id))
	
@app.command()
def join(username, room_id):
	asyncio.run(main(username, room_id))

@app.command()
def history():
	pass

@app.command()
def reconnect():
	pass


if __name__ == "__main__":
    app()