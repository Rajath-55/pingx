from tkinter import HORIZONTAL
from rich.panel import Panel

from textual.app import App
from textual.reactive import Reactive
from textual.widget import Widget




	
class Hover(Widget):

    mouse_over = Reactive(False)

    def __init__(self, i) -> None:
        super().__init__()
        self.i = i
    def render(self) -> Panel:
        return Panel("Chat #[b]" + str(self.i) + "[/b]", style=("on red" if self.mouse_over else ""))

    def on_enter(self) -> None:
        self.mouse_over = True

    def on_leave(self) -> None:
        self.mouse_over = False


# class HoverApp():
#     """Demonstrates custom widgets"""
#     async def on_mount(self) -> None:
#         hovers = (Hover() for _ in range(10))
#         await self.view.dock(*hovers, edge="top")

