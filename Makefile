GANACHE_VERSION = 2.5.4
GANACHE_DOWNLOAD = \
	curl -L https://github.com/trufflesuite/ganache-ui/releases/download/v${GANACHE_VERSION}/ganache-${GANACHE_VERSION}-linux-x86_64.AppImage > ./local-network/ganache.AppImage &&\
	chmod +x local-network/ganache.AppImage

YARN_INSTALL_DEPENDENCIES = \
	yarn add global truffle ganache-cli &&\
	yarn install

install:
	${YARN_INSTALL_DEPENDENCIES}
	${GANACHE_DOWNLOAD}

# Run Network Before compile and migrate
run-network-cli:
	ganache-cli

run-network-gui:
	./local-network/ganache.AppImage

compile:
	truffle compile

deploy:
	truffle migrate

console:
	truffle console

get-balance:
	truffle exec ./scripts/getMyTokenBalance.js

transfer-token:
	truffle exec ./scripts/transferMyTokenToFarmToken.js

withdraw-token:
	truffle exec ./scripts/withdrawMyTokenFromTokenFarm.js

