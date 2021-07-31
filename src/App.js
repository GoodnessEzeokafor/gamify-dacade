import React, { useEffect, useState } from "react";
import { newKitFromWeb3 } from "@celo/contractkit";
import "@celo-tools/use-contractkit/lib/styles.css";
import BigNumber from "bignumber.js";
import gamifyABI from "./contracts/abi/gamify.abi.json";
import erc20Abi from "./contracts/abi/erc20.abi.json";
import { create, urlSource } from "ipfs-http-client";

import Web3 from "@celo/contractkit/node_modules/web3";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

const ContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
const gamifyaddress = "0xf28d9714824796a76283CbDB53B96B3011c09BA7";

// import ipfs

/* Create an instance of the IPFS client */

const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");

export default function App() {
  const [loading, setloading] = useState(false);

  const [celoBalance, setCeloBalance] = useState(0);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [games, setGames] = useState([]);

  const [kit, setKit] = useState(null);
  const [address, setAddress] = useState(null);
  const [contract, setcontract] = useState(null);
  
  // the file url
  const [fileUrl, updateFileUrl] = useState(``);

  const ERC20_DECIMALS = 18;

  useEffect(() => {
    // connect the users wallet
    connectCeloWallet();
  }, []);

  const connectCeloWallet = async () => {
    if (window.celo) {
      // notification("⚠️ Please approve this DApp to use it.")
      try {
        setloading(true)
        await window.celo.enable();
        // notificationOff()
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];
        kit.defaultAccount = user_address;

        const contract = new kit.web3.eth.Contract(gamifyABI, gamifyaddress);

        setKit(kit);
        setAddress(user_address);
        setcontract(contract);
      } catch (error) {
        console.log({ error });
        setloading(false)
      }
    } else {
      console.log("please install the extension");
      alert("⚠️ Please install the CeloExtensionWallet.")
    }
  };

  useEffect(() => {
    if (kit && address) {
      return getBalance();
    } else {
      console.log("no kit or address");
    }
  }, [kit, address]);

  const getBalance = async () => {
    setloading(true)
    const balance = await kit.getTotalBalance(address);
    const celoBalance = balance.CELO.shiftedBy(-ERC20_DECIMALS).toFixed(2);
    const cUSDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

    setCeloBalance(celoBalance);
    setcUSDBalance(cUSDBalance);
    setloading(false)
  };

  const getGames = async () => {
    setloading(true)
    const _gameLength = await contract.methods.gamesLength().call();
    const _games = [];

    for (let i = 0; i < _gameLength; i++) {
      let _b = new Promise(async (resolve, reject) => {
        let _game = await contract.methods.getGame(i).call();

        resolve({
          index: i,
          owner: _game.owner,
          game_name: _game.name,
          cover_photo: _game.image_link,
          description: _game.description,
          game_file: _game.file_link,
          price: _game.price,
          sales: _game.game_sales,
        });
      });
      _games.push(_b);
    }
    const all_games = await Promise.all(_games);

    setGames(all_games);
    setloading(false)
  };

  useEffect(() => {
    if (contract) return getGames();
  }, [contract]);

  const purchaseGame = async (_price, _index, game_file) => {
    try {
      setloading(true)
      const cUSDContract = new kit.web3.eth.Contract(erc20Abi, ContractAddress);

      await cUSDContract.methods.approve(
        gamifyaddress,
        _price
      ).send({ from: address });

      await contract.methods.buyGame(_index).send({
        from: address
      }).then(() => {
        alert ("Your download will begin shortly from IPFS...")
        window.open(game_file, '_blank') || window.location.replace(game_file);
      });
    
      getBalance();
      getGames();
      setloading(false)
    } catch (error) {
      console.error(error);
      setloading(false)
    }
  };

  // upload game files to IPFS
  const uploadHelper = async (_file) => {
    try {
      const file = await ipfsClient.add(_file);
      console.log(file);
      const path = `https://ipfs.infura.io/ipfs/${file.path}`;
    
      return path;
    } catch (error) {
      console.log("Error uploading file: ", error);
      // return false
      setloading(false)
      throw error;
    }
  };

  // create a game
  const createGame = async (title, price, description, imageFile, gameFile) => {
    setloading(true)
    const image_link = await uploadHelper(imageFile);
    const game_link = await uploadHelper(gameFile);
    const game_price = BigNumber(price).shiftedBy(ERC20_DECIMALS).toString();

    if (!image_link || !game_link) {
      setloading(false)
      return alert("Failed to upload game image or file");
    }

    await contract.methods.addGame(
      title,
      description,
      image_link,
      game_link,
      game_price
    ).send({ from: address });
    

    await getGames();
    getBalance();
    setloading(false)
  };

  return (
    <>
      <Header
        cUSDBalance = {cUSDBalance}
        celoBalance = {celoBalance}
      />
      <Body
        createGame={createGame}
        fileUrl={fileUrl}
        games={games}
        cUSDBalance={cUSDBalance}
        purchaseGame={purchaseGame}
        loading = {loading}
      />
      <Footer />
    </>
  );
}
