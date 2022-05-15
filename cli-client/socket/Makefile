VENV := venv

all: venv

$(VENV)/bin/activate: requirements.txt
	python3 -m venv $(VENV)
	./$(VENV)/bin/pip install -r requirements.txt


venv: $(VENV)/bin/activate

methods: venv
	./$(VENV)/bin/python methods.py

run: venv
	./$(VENV)/bin/python3 main.py

test: venv
	./$(VENV)/bin/python3 test.py
clean:
	rm -rf $(VENV)
	find . -type f -name '*.pyc' -delete

client:
	./$(VENV)/bin/python3 client.py
.PHONY: all venv run clean