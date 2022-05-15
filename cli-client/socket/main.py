from logging import PlaceHolder
from methods import *
from textual.app import App
from textual.widgets import Placeholder
from hover import *
# import pyfiglet module
import pyfiglet
import time

def convert_ascii(text):
    ascii_text = pyfiglet.figlet_format(text)
    # print(ascii_text)
    return ascii_text



    
class Terminal(App):
    # on mount is called when the app is mounted, renders the grid and children
    async def on_mount(self) -> None:
        hovers = (Hover(_) for _ in range(7))
        await self.view_dock(Placeholder(), edge="top")
        await self.view.dock(*hovers, edge="left", size=5)
        await self.view.dock(Placeholder(), edge="top")




if __name__ == "__main__":
    print(convert_ascii("pingx"))
    Terminal.run()