from datetime import datetime 



def get_timestamp():
    now = datetime.now()
    timestamp = now.strftime("%H:%M:%S")
    print(timestamp)
    return timestamp
