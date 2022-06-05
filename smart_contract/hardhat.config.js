// https://eth-ropsten.alchemyapi.io/v2/cCsNrlPo6G3WSz0K_WL1tNKzZq_HILVY

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: " https://eth-ropsten.alchemyapi.io/v2/cCsNrlPo6G3WSz0K_WL1tNKzZq_HILVY",
      accounts: [
        "52910e1ae23bb8f2229572198c8bd316be39a05c4ce52b9e99059c905ec34cd2",
      ],
    },
  },
};
