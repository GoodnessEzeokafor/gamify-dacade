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
    string description;
    string image_link; // ipfs link of game image after being uploaded
    string file_link; //ipfs link of game file after being uploaded
    uint price;
    uint game_sales;
    bool status;
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

  // Modifier to restrict some access to Contract Admin
  modifier onlyContractAdmin {
    require(msg.sender == adminAddress, "Only Contract Admin can call this function");
    _;
  }
  // Modifier to restrict some access to Game owner
  modifier onlyGameOwner(uint256 _id) {
    require(msg.sender == games[_id].owner, "Only owner of the game can call this function.");
    _;
  }

  constructor() {
    // Declaring the admin address
    adminAddress = msg.sender;
  }

  // Adding a Game to the contract
  function addGame(
    string memory _name,
    string memory _description,
    string memory _image_link,
    string memory _file_link,
    uint _price
  ) public {
    uint _game_sales = 0;
    bool _status = true;
    
    games[gamesLength] = Game(
      payable(msg.sender),
      _name,
      _description,
      _image_link,
      _file_link,
      _price,
      _game_sales,
      _status
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
    string memory description,
    string memory image_link, 
    string memory file_link, 
    uint price, 
    uint game_sales,
    bool status
  ) {
    Game storage game = games[_index];
    return(
      game.owner,
      game.name,
      game.description,
      game.image_link,
      game.file_link,
      game.price,
      game.game_sales,
      game.status
    );
  }

  // Geting a single Sale
  function getSale(uint _index) onlyContractAdmin public view returns (
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
    bool _isValid = IERC20Token(cUsdTokenAddress).transferFrom(
      msg.sender,
      _game.owner,
      _game.price
    );

    return (_isValid);
  }

  // Buying a Game then send CUSD to the owner and record Sale
  function buyGame(uint _index) public payable  {
    Game storage game = games[_index];

    //   ensure the game hasn't been sold out
    require(game.status != false, "This game has been sold out");
    require(gamePayment(game), "Game purchase failed.");
    game.game_sales++;

    addSale(_index, game);
  }

  // Owner of the game can set a discount or reduce the price
  function updateGamePrice(
    uint _id,
    uint _newPrice
  ) onlyGameOwner(_id) public {
    games[_id].price = _newPrice;
  }
  
  // Owner of the game can set a game to sold out
  function updateGameStatus(uint _id) onlyGameOwner(_id) public{
    games[_id].status = false;
  }
}