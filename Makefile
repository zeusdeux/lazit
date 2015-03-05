# folders
SRC        = ./src
TEST       = ./test
BUILD      = ./build
BIN        = $(NODEMOD)/.bin
NODEMOD    = ./node_modules
TEST			 = ./test

# files
MAIN       = $(SRC)/index.js
BROWSER		 = $(SRC)/browser.js
MAPFILE    = lazit.min.map

all: jshint test $(BUILD)/lazit.min.js

force: $(BUILD)/lazit.min.js

jshint:
	$(BIN)/jshint $(SRC)/*.js

test:
# run test
	$(BIN)/mocha -r should -u bdd -b --compilers js:babel/register $(TEST)/*.js

test-watch:
	$(BIN)/mocha -r should -u bdd -b --compilers js:babel/register $(TEST)/*.js -w

$(BUILD)/lazit.min.js: $(BUILD)/lazit.js
	$(BIN)/uglifyjs $^ \
  -o $@ \
  -c -m \
  --source-map $(BUILD)/$(MAPFILE) \
  --source-map-root ../../ \
  --source-map-url ./$(MAPFILE) \
  --comments \
  --stats

$(BUILD)/lazit.js: $(MAIN) $(BROWSER) $(SRC)/esnext/*.js $(NODEMOD)/auto-curry/index.js $(NODEMOD)/clone/clone.js
# generate es5 variants of the source
	$(BIN)/babel $(SRC)/esnext --out-dir $(SRC)/es5
# todo:
# gotta do something like below and provide readily usable
# single functions in the browser
#	$(BIN)/browserify-directory $(SRC)/esnext $(SRC/) -t babelify
	$(BIN)/browserify -s lazit -e $(BROWSER) -o $@ -t babelify

clean:
	rm -f $(BUILD)/*
	rm -f $(SRC)/es5/*

.PHONY: all force jshint test test-watch clean
