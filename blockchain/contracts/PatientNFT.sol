// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol"; 

contract PatientNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter; 
    Counters.Counter private _tokenIds; 

    // ✅ Mapping to store hashed metadata to prevent duplicate NFTs
    mapping(bytes32 => bool) private existingNFTs; 

    // ✅ Updated NFTMinted event with indexed tokenId for better event filtering
    event NFTMinted(address indexed recipient, uint256 indexed tokenId, string metadataURI);

    // ✅ Constructor: Initializes NFT collection with name & symbol
    constructor() ERC721("PatientNFT", "PNFT") {
        _transferOwnership(msg.sender);
    }

    // ✅ Mint a new NFT function
    function mintNFT(address recipient, string memory metadataURI) public onlyOwner returns (uint256) {
        // ✅ Ensure uniqueness by checking if metadata already exists
        bytes32 metadataHash = keccak256(abi.encodePacked(metadataURI));
        require(!existingNFTs[metadataHash], "NFT already exists!");

        // ✅ Increment token ID counter
        _tokenIds.increment(); 
        uint256 newItemId = _tokenIds.current(); 

        // ✅ Mint the NFT to recipient
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, metadataURI);

        // ✅ Mark metadata as used
        existingNFTs[metadataHash] = true;

        // ✅ Emit event (With `indexed` tokenId)
        emit NFTMinted(recipient, newItemId, metadataURI);

        return newItemId;
    }

    // ✅ Function to check if an NFT with given metadata already exists
    function nftExists(string memory metadataURI) public view returns (bool) {
        return existingNFTs[keccak256(abi.encodePacked(metadataURI))];
    }
}
