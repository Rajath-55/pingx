from rich.console import Console
from rich.padding import Padding

class MyConsole(Console):
    def __init__(self):
        super().__init__(color_system = "truecolor")

    def print(self, *args, **kwargs):
        super().print(Padding(args, (2,4),  style="on blue"), **kwargs)

    def rule(self, *args, **kwargs):
        super().print(Padding(args, (2,4),  style="on green"), **kwargs)
    
    def print_error(self, *args, **kwargs):
        super().print(Padding(args, (2,4),  style="on red"), **kwargs)

    def print_warning(self, *args, **kwargs):
        super().print(Padding(args, (2,4),  style="on yellow"), **kwargs)
    
    def print_info(self, *args, **kwargs):
        super().print(Padding(args, (2,4),  style="on cyan"), **kwargs)
    
    def nprint(self, *args, **kwargs):
        super().print(args, **kwargs)
        
console = Console()
