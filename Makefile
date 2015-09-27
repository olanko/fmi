all:
	@echo usage: make clean

clean:
	find ./ -name "*~" -exec rm {} \;

