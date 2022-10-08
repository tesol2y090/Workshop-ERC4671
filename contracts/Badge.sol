// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Base64.sol";

import "./ERC4671.sol";

contract Badge is ERC4671 {

	string private badgeName;
	string private badgeDescription;

	mapping(address => bool) public isUserMinted;

	event MintToken(address owner, uint256 tokenId);

	constructor(string memory _name, string memory _symbol, string memory _badgeName, string memory _badgeDescription) ERC4671(_name, _symbol) {
		badgeName = _badgeName;
		badgeDescription = _badgeDescription;
	}

	function mint() external {
		require(!isUserMinted[msg.sender], "Already mint");

		uint256 tokenId = _mint(msg.sender);

		isUserMinted[msg.sender] = true;

		emit MintToken(msg.sender, tokenId);
	}

	function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
		bytes memory dataURI = abi.encodePacked(
			'{',
					'"name": "', badgeName, '",',
					'"description": "', badgeDescription, '"',
			'}'
		);

		return string(
			abi.encodePacked(
				"data:application/json;base64,",
				Base64.encode(dataURI)
			)
		);
	}

}