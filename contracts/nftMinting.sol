// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract mintRoomNFT is ERC721Enumerable {
    string public metadataURI;
    uint256 public totalNFT;
    
    constructor(string memory _name, string memory _symbol, string memory _metadataURI, uint256 _totalNFT) ERC721(_name, _symbol) {
        metadataURI = _metadataURI;
        totalNFT = _totalNFT;
    }
 
    function mintRooms() public {
        require(totalNFT > totalSupply(), "No more minting..");
        uint256 tokenId = totalSupply() + 1;

        _mint(msg.sender, tokenId);
    }

    function batchMint(uint256 _amount) public {
        for(uint256 i = 0; i < _amount; i++) {
            mintRooms();
        }
    }

    function tokenURI(uint256 _tokenId) public override view returns(string memory) {
        return string(abi.encodePacked(metadataURI, '/', Strings.toString(_tokenId), '.json'));
    }
}