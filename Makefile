# folders
SRC        = ./src
TEST       = ./test
BUILD      = ./build
BIN        = $(NODEMOD)/.bin
NODEMOD    = ./node_modules

# files
MAIN       = $(SRC)/index.js
MAPFILE    = list-operations.min.map

all: jshint test $(BUILD)/list-operations.min.js

force: $(BUILD)/list-operations.min.js

jshint:
	$(BIN)/jshint $(SRC)/*.js

test:
	$(BIN)/mocha -r should -u bdd -b $(TEST)/*

$(BUILD)/list-operations.min.js: $(BUILD)/list-operations.js
	$(BIN)/uglifyjs $^ \
  -o $@ \
  -c -m \
  --source-map $(BUILD)/$(MAPFILE) \
  --source-map-root ../../ \
  --source-map-url ./$(MAPFILE) \
  --comments \
  --stats

$(BUILD)/list-operations.js: $(SRC)/* $(NODEMOD)/auto-curry/index.js
	$(BIN)/browserify -s listOperations -t babelify -e $(MAIN) -o $@

clean:
	rm -f $(BUILD)/*

.PHONY: all jshint test clean
