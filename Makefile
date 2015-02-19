# folders
SRC        = ./src
TEST       = ./test
BUILD      = ./build
BIN        = $(NODEMOD)/.bin
NODEMOD    = ./node_modules

# files
MAIN       = $(SRC)/index.js
MAPFILE    = lazit.min.map

all: jshint test $(BUILD)/lazit.min.js

force: $(BUILD)/lazit.min.js

jshint:
	$(BIN)/jshint $(SRC)/*.js

test:
	$(BIN)/mocha -r should -u bdd -b $(TEST)/*

$(BUILD)/lazit.min.js: $(BUILD)/lazit.js
	$(BIN)/uglifyjs $^ \
  -o $@ \
  -c -m \
  --source-map $(BUILD)/$(MAPFILE) \
  --source-map-root ../../ \
  --source-map-url ./$(MAPFILE) \
  --comments \
  --stats

$(BUILD)/lazit.js: $(SRC)/* $(NODEMOD)/auto-curry/index.js
	$(BIN)/browserify -s lazit -e $(MAIN) -o $@ -t [babelify --experimental]

clean:
	rm -f $(BUILD)/*

.PHONY: all jshint test clean
