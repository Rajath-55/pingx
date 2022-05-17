### Python CLI for pingx

To run the application, first install the dependencies:



```bash
$ ./script.sh
```

Then run the application:



```bash
$ alias pingx='./venv/bin/python3 pingx.py'
$ pingx --options
```

To check all the options, run:
```bash
$ pingx --help
```

Commands:

```bash
$ pingx login USERNAME [Used to login with the username]
$ pingx register USERNAME [Used to register the username locally, in a .pingxconfig file]
$ pingx reconnect [Reconnect to the last joined room (TODO)]
$ pingx history [Show the history of the all joined rooms (TODO)]
$pingx create ROOMID [Create a new room with the room id]
$ pingx join ROOMID [Join a room with the room id]
```


Alternatively, you can run the application with the following command:
```bash
$ make methods
```
This is for just development purposes and will be removed in the future.




	