import React, { useEffect, useState } from "react";
import { newKitFromWeb3 } from "@celo/contractkit";
import "@celo-tools/use-contractkit/lib/styles.css";
import BigNumber from "bignumber.js";
import charityABI from "./contracts/abi/gamesale.abi.json";
import erc20Abi from "./contracts/abi/erc20.abi.json";
import { create } from "ipfs-http-client";

import Web3 from "@celo/contractkit/node_modules/web3";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
const ContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
const game_address = "0x6cBb42169A5bac225dF6e3D81e90712591FC6aA0";

// import ipfs

/* Create an instance of the client */

const client = create("https://ipfs.infura.io:5001/api/v0");

export default function App() {
  const [loading, setloading] = useState(false);

  const [celoBalance, setCeloBalance] = useState(0);

  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [games, setGames] = useState([]);
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  // the file url
  const [fileUrl, updateFileUrl] = useState(``);

  const ERC20_DECIMALS = 18;
  useEffect(() => {
    // connect the users wallet
    connectCeloWallet();
  }, []);

  // upload game file to IPFS
  const uploadImage = async (file) => {
    console.log({ file });
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log({ url });
      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
      // return false
      throw error;
    }
  };

  const connectCeloWallet = async () => {
    if (window.celo) {
      // notification("⚠️ Please approve this DApp to use it.")
      try {
        await window.celo.enable();
        // notificationOff()
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);

        await setKit(kit);
      } catch (error) {
        console.log({ error });
        // notification(`⚠️ ${error}.`)
      }
    } else {
      console.log("please install the extension");
      // notification("⚠️ Please install the CeloExtensionWallet.")
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
    const balance = await kit.getTotalBalance(address);
    const celoBalance = balance.CELO.shiftedBy(-ERC20_DECIMALS).toFixed(2);
    const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

    const contract = new kit.web3.eth.Contract(charityABI, game_address);
    setcontract(contract);
    setCeloBalance(celoBalance);
    setcUSDBalance(USDBalance);
  };

  const getGames = async () => {
    const _gameLength = await contract.methods.getGameLength().call();
    const _games = [];

    for (let i = 0; i < _gameLength; i++) {
      let _b = new Promise(async (resolve, reject) => {
        let _game = await contract.methods.getGame(i).call();

        resolve({
          index: i,
          owner: _game[0],
          game_name: _game[1],
          cover_photo: _game[2],

          description: _game[3],
          ipfs_hash: _game[4],
          price: _game[5],
          sales: _game[6],
        });
      });
      _games.push(_b);
    }
    const all_games = await Promise.all(_games);

    setGames(all_games);
    console.log({ all_games });
  };

  useEffect(() => {
    if (contract) return getGames();
  }, [contract]);

  const purchaseGame = async (_price, _index, ipfs_hash) => {
    try {
      const cUSDContract = new kit.web3.eth.Contract(erc20Abi, ContractAddress);

      const game_price = _price;

      console.log({ game_price });
      const result = await cUSDContract.methods
        .approve(game_address, game_price)
        .send({ from: address });

      await contract.methods.buyGame(_index).send({ from: address });

      window.location.href = ipfs_hash;
      // return result
      getBalance();
      getGames();
    } catch (error) {
      console.log({ error });
    }
  };

  // create a game

  const createGame = async (title, image, description, gamefile, price) => {
    const ipfs_hash = await uploadImage(gamefile);
    if (!ipfs_hash) {
      return alert("Failed to upload game file");
    }

    const game_price = BigNumber(price).shiftedBy(ERC20_DECIMALS).toString();

    await contract.methods
      .addGame(title, image, description, ipfs_hash, game_price)
      .send({ from: address });
    // return result
    await getGames();
  };

  return (
    <>
      <Header />
      <Body
        createGame={createGame}
        fileUrl={fileUrl}
        games={games}
        cUSDBalance={cUSDBalance}
        purchaseGame={purchaseGame}
      />
      <Footer />
    </>
  );
}
