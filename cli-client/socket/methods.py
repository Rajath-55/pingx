import asyncio
import socketio
import requests
import json
from utils import *
from rich import print as pprint
from rich.panel import Panel
import os
from console import console
from pick import pick
import aioconsole
import sys
from rich.layout import Layout
# from rich.prompt import Prompt



#socketio client
sio = socketio.AsyncClient()
SERVER_URL = 'https://pingx-server.herokuapp.com'





@sio.event
async def connect():
    console.rule("[bold red]Connected to server[/]")

    
@sio.on('room-join-failure')
async def check_room(data):
    console.print("[red]" + data + "[/]")
    await sio.disconnect()
    sys.exit()



@sio.event
async def join(username = None, roomID = None):
    if not roomID:
        room_id = get_room_id()
    else:
        room_id = roomID
    if not username:
        username = "user"
    ok = await sio.emit('join-room', {'username' : username, 'roomID': room_id})

    console.print("[green] Joined room: " + room_id)
    # console.print("[green]Current user count: [/]" + current_users)

    



@sio.event 
async def send_message(message, username):
    # console.print("[bold gray]:message: you: [/] " + "[bold]" + message + "[/]")
    time_stamp = get_timestamp()
    print("\033[A", end="")
    pprint("[bold green]you: [/]" + message + " ", end="")
    console.print("[red]-[/] " + time_stamp)
    await sio.emit('send-message', {'username' :username, 'message': message, 'timeStamp' : time_stamp})


@sio.on('receive-message')
async def recieve_message(message):
    sys.stdout.write('\033[2K\033[1G')
    console.print('[green]' + message['username'] + ":[/] [cyan]" + message['message'] + "[/] [red]-[/] " + convert_time(message['timeStamp']))
    # await get_input(user)
    pprint("[bold green]you: [/]", end="")
    

@sio.on('room-update')
async def update_members(data):
    pass
    # global current_users
    # current_users = data
    # console.print("Current user count: " + str(len(data)))



@sio.event
def connect_error(data):
    console.print("The connection failed!")



@sio.event
async def disconnect():
    console.print(Panel('[red bold] Disconnected from server'), justify = 'center')


async def get_input(username):
    global user
    user = username
    while True:
        pprint("[bold green]you: [/]", end="")
        message = await aioconsole.ainput("")
        if message == "!!quit":
            await sio.disconnect()
            console.print("[red]Disconnected from server[/], [bold]Goodbye![/]")
            sys.exit()   
            
        await send_message(message, username)
        await get_input(username)


#TODO try to make layouts and independent input scheme
def make_layout() -> Layout:
    layout = Layout()
    layout.split_column(
    Layout(name="chat_window", ratio=4),
    Layout(name="type_window"))
    layout["type_window"].split_row(Layout(name="users_list"), Layout(name="input_window", ratio = 4))
    pprint(layout)
    return layout

#registers the user (makes the config file for now) and returns the username
def register_user(user_name):
    if not os.path.exists('./.pingxconfig'):
        os.mkdir('./.pingxconfig')
    if not os.path.exists('./.pingxconfig/' + user_name + '_config.json'):
        with open('./.pingxconfig/' + user_name + '_config.json', 'w') as f:
            json.dump({'username': user_name, 'avatar' : 'idkbahi', 'ascii-avatar' : 'tbd', 'theme' : 'sql hehe'}, f)
    return user_name

async def create_room(room_id:str):
    #create command not working rn
    if room_id is not None:
        await sio.connect(SERVER_URL)
        await sio.emit('join-room', {'username' : 'inp_user', 'roomID': room_id})
        console.print(Panel("[bold yellow underline]Created room " + room_id), justify="center")
        await sio.disconnect()
        sys.exit()

async def main(inp_user = None, room_id = None):
    if inp_user is None:
        inp_user = 'user'
    
    console.print(convert_ascii("pingx"), justify="center", style="cyan")
    console.print("[cyan]The command line chat app", justify='center')
    console.print(Panel("[magenta]Created by: [bold red]@pingx team[/]"), justify='center')
    console.print("[cyan]Type !!quit to exit[/]")

    # console.print("[green]Connecting to server...[/]")
    if inp_user is not None:
        username = register_user(inp_user)
    else:
        username = 'user'

    console.print("[yellow]Connecting to server...", justify='center')
    await sio.connect(SERVER_URL)

    if room_id is None:
        title = 'Do you want to create a new room or join an existing one?'
        options = ['Join a room', 'Create a room']
        option, index = pick(options, title, indicator='➡️ ', default_index=0)
        console.print("[green]" + option, justify='center')
        if option == 'Join a room':
            console.print("Enter the room ID: ")
            roomID = input()
            await join(username,roomID)
        elif option == 'Create a room':
            await join(username)
    else:
        await join(username, room_id)
    
    await get_input(inp_user)

    await sio.wait()



def get_room_id():
    url = SERVER_URL + '/create'
    response = requests.get(url)
    json_data = json.loads(response.text)
    return json_data['roomID']
    
 

if __name__ == '__main__':
    asyncio.run(main())