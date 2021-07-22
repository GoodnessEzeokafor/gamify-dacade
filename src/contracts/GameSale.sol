// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;


// interface
interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}


// game contract

contract CeloGames {

// game struct
  struct Game {
    address payable owner;
    string name;
    string image;
    string description;
    string ipfs_hash; //ipfs hash of game after being uploaded
    uint price;
    uint sales;
  }

// number of games
  uint internal gamesLength = 0;

// owner of ths contract
address payable internal onwerAddress;

// mapping of game to a unique index identifier
  mapping (uint => Game) internal games;
  address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

  constructor() {
    //   declare the owner address
    onwerAddress = payable(msg.sender);
  }


// add a game to the blockchain
  function addGame(
    string memory _name,
    string memory _image,
    string memory _description, 
    string memory _ipfs_hash,
    uint _price
  ) public {
    uint _sales = 0;
    games[gamesLength] = Game(
      payable(msg.sender),
      _name,
      _image,
      _description,
      _ipfs_hash,
      _price,
      _sales
    );
    gamesLength++;
  }


// get a single game
  function getGame(uint _index) public view returns (
    address payable owner,
    string memory name, 
    string memory image, 
    string memory description, 
    string memory ipfs_hash, 
    uint price, 
    uint sales
  ) {
    Game storage game = games[_index];
    return(
      game.owner,
      game.name,
      game.image,
      game.description,
      game.ipfs_hash,
      game.price,
      game.sales
    );
  }


// function to buy a game and send cusd to the owner
  function buyGame(uint _index) public payable  {
 
    require(
      IERC20Token(cUsdTokenAddress).transferFrom(
        msg.sender,
        games[_index].owner,
        games[_index].price
      ),
      "Game purchase failed."
    );
    games[_index].sales++;
  }
  
  function getGameLength() public view returns (uint) {
    return (gamesLength);
  }

}