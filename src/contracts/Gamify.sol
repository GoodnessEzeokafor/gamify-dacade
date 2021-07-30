// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;


// CUSD Token Contract Interface
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


// Gamify contract

contract Gamify {
  // Game struct
  struct Game {
    address payable owner;
    string name;
    string image;
    string description;
    string ipfs_hash; //ipfs hash of game after being uploaded
    uint price;
    uint game_sales;
  }

  // Sale struct
  struct Sale {
    uint game_id;
    address buyer;
    address seller;
    uint amount;
    uint timestamp;
  }

  // Total number of games
  uint public gamesLength = 0;

  // Total number of sales
  uint public salesLength = 0;

  // Admin address of this contract
  address internal adminAddress;

  // CUSD Token Contract Address
  address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

  // Mapping of Game to a unique index identifier
  mapping (uint => Game) internal games;

  // Mapping of Sale to a unique index identifier
  mapping (uint => Sale) internal sales;

  constructor() {
    // Declaring the admin address
    adminAddress = msg.sender;
  }

  // Modifyer to restrict some access to the Contract Admin Only
  modifier restricted {
    require(msg.sender == adminAddress, "Only the Contract Admin can access this function");
    _;
  }

  // Adding a Game to the contract
  function addGame(
    string memory _name,
    string memory _image,
    string memory _description, 
    string memory _ipfs_hash,
    uint _price
  ) public {
    uint _game_sales = 0;
    games[gamesLength] = Game(
      payable(msg.sender),
      _name,
      _image,
      _description,
      _ipfs_hash,
      _price,
      _game_sales
    );
    gamesLength++;
  }

  // Adding a Sale to the contract
  function addSale(
    uint _index,
    Game storage _game
  ) internal {
    sales[salesLength] = Sale(
      _index,
      msg.sender,
      _game.owner,
      _game.price,
      block.timestamp
    );
    salesLength++;
  }

  // Geting a single Game
  function getGame(uint _index) public view returns (
    address owner,
    string memory name, 
    string memory image, 
    string memory description, 
    string memory ipfs_hash, 
    uint price, 
    uint game_sales
  ) {
    Game storage game = games[_index];
    return(
      game.owner,
      game.name,
      game.image,
      game.description,
      game.ipfs_hash,
      game.price,
      game.game_sales
    );
  }

  // Geting a single Sale
  function getSale(uint _index) restricted public view returns (
    uint game_id,
    address buyer,
    address seller,
    uint amount,
    uint timestamp
  ) {
    Sale storage sale = sales[_index];
    return(
      sale.game_id,
      sale.buyer,
      sale.seller,
      sale.amount,
      sale.timestamp
    );
  }

  // Paying for a Game
  function gamePayment(Game storage _game) internal returns (bool) {
    (bool _isValid, ) = IERC20Token(cUsdTokenAddress).transferFrom(
      msg.sender,
      _game.owner,
      _game.price
    );

    return (_isValid);
  }

  // Buying a Game then send CUSD to the owner and record Sale
  function buyGame(uint _index) public payable  {
    Game storage game = games[_index];
 
    require(gamePayment(game), "Game purchase failed.");
    game.game_sales++;

    addSale(_index, game);
  }
}