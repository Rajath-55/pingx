from datetime import datetime 
from dateutil.parser import parse
import pytz    # $ pip install pytz
import tzlocal 

# import pyfiglet module
import pyfiglet
  

def convert_ascii(text):
    ascii_text = pyfiglet.figlet_format(text)
    # print(ascii_text)
    return ascii_text


def get_timestamp():
    now = datetime.now()
    timestamp = now.strftime("%H:%M:%S")
    # print(timestamp)
    return timestamp

def convert_time(date_time):
    local_timezone = tzlocal.get_localzone() # get pytz tzinfo
    # utc_time = datetime.strptime(parse(date_time).strftime(), "%Y-%m-%d %H:%M:%S")
    # local_time = utc_time.replace(tzinfo=pytz.utc).astimezone(local_timezone)
    # return local_time.strptime("%H:%M:%S")
    return parse(date_time).strftime("%H:%M:%S")