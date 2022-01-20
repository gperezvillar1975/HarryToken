const HarryToken = artifacts.require("HarryToken");

module.exports = function (deployer) {
  deployer.deploy(HarryToken);
};
