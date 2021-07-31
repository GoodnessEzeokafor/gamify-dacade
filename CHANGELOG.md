# Gamify ChangeLog

Change Log file for the dacade [Celo Development 101](https://dacade.org/communities/celo-development-101) dApp submission by [GoodnessEzeokafor](https://dacade.org/communities/celo-development-101/submissions/7463cb3f-d328-4708-800a-dc9fef03f453).

**```Keywords```**

* `Added` for new features.
* `Changed` for changes in existing functionality.
* `Deprecated` for soon-to-be removed features.
* `Removed` for now removed features.
* `Fixed` for any bug fixes.
* `Security` in case of vulnerabilities.

## [emmanuelJet](https://github.com/emmanuelJet) - 2021-07-31

Great submission and nice implmentation of IPFS. **Contract Review:** I optimized the contract code by changing the way a game image is saved using IPFS, changed the code structure of some functions (buyGame, updateGamePrice, updateGameStatus), added a Sale functionality to record all sales details (Game ID, Buyer, Seller, Amount and Timestamp) then made the getSale() restricted and accessible by the contract admin (onlyContractAdmin modifier). **DApp Review:** I optimized the dApp to work with the updated smart contract codes and added a GitHub Workflow script to automatically build and deploy the dApp using GitHub Pages. **Design Review:** I did a rebrand of *`Celo Games`* to *`Gamify`* and made then fixed the favicon image bug. Also, I displayed the user CELO Balance, restructured the display of the `Sell your Games` form, updated the Footer Copyright position, and fixed the download game window bug after a successfull payment has been made.

### Added

* build_and_deploy.yml file
* .editorconfig file
* CHANGELOG.md file

### Changed

* Contracts with its JSON abi files
* package.json file
* README.md file
* index.html file
* App.js, Body.js, Footer.js, and Header.js files

### Removed

* yarn.lock file
