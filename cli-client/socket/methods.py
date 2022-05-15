import asyncio
import socketio
import requests
import json
from utils import *
from ascii import *
import pprint
import os
#socketio client
sio = socketio.AsyncClient()
SERVER_URL = 'https://pingx-server.herokuapp.com'

def get_username():
    with open('config.json', 'r') as f:
        data = json.load(f)
        return data['username']


@sio.event
async def connect():
    print('connection established')



@sio.event
async def join(username = None, roomID = None):
    if not roomID:
        room_id = get_room_id()
    else:
        room_id = roomID
    if not username:
        username = "user"
    await sio.emit('join-room', {'username' : username, 'roomID': room_id})
    print("Joined room: " + room_id)
    


@sio.event 
async def send_message(message, username):
    print(message)
    await sio.emit('send-message', {'username' :username, 'message': message, 'timeStamp' : get_timestamp()})


@sio.on('receive-message')
async def recieve_message(message):
    print(message['username'] + ": " + message['message'] + " at " + message['timeStamp'])

@sio.on('*')
async def catch_all(event, data):
   pass

@sio.event
def connect_error(data):
    print("The connection failed!")



@sio.event
async def disconnect():
    print('disconnected from server')

async def main():
    print(convert_ascii("                    pingx                   "))
    pprint.pp("Command cline chat app")
    if not os.path.exists('./config.json'):
        print("Enter your username: ")
        username = input()
        with open('config.json', 'w') as f:
            json.dump({'username': username, 'avatar' : 'idkbahi', 'ascii-avatar?' : 'lesee'}, f)
    else:
        username = get_username()
    print("Connecting to server...")
    await sio.connect(SERVER_URL)
    await join(username)
    await asyncio.sleep(5)
    for _ in range(10):
        await send_message( "Message #" + str(_) + " from client",username=username,)
        await asyncio.sleep(1)
  
    await sio.wait()


def get_room_id():
    url = SERVER_URL + '/create'
    response = requests.get(url)
    json_data = json.loads(response.text)
    return json_data['roomID']
    
 

if __name__ == '__main__':
    asyncio.run(main())