// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev Example of the ERC20 Token.
 */

contract HarryToken is ERC20Capped, Ownable {

	using SafeMath for uint256;

	uint256 CAP = 1000000000;
	uint256 TOTALSUPPLY = CAP.mul(10 ** 18);

	constructor() ERC20("HarryToken", "HRT") ERC20Capped(TOTALSUPPLY) Ownable()
	{
		ERC20._mint(msg.sender, TOTALSUPPLY);
	}
}