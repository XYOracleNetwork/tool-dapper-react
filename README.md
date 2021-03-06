[logo]: https://cdn.xy.company/img/brand/XYO_full_colored.png

[![logo]](https://xyo.network)

# Dapper

<h3 align="center">
  "Simulate your Smart Contracts"
</h3>

---

[![NPM](https://img.shields.io/npm/v/@xyo-network/tool-dapper-react.svg?style=plastic)](https://www.npmjs.com/package/@xyo-network/tool-dapper-react)

![](https://github.com/XYOracleNetwork/tool-dapper-react/workflows/Build/badge.svg?branch=develop)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3a9e6699e32345b983e0233aeb9e73d1)](https://www.codacy.com/app/pllearns/tool-dapper-react?utm_source=github.com&utm_medium=referral&utm_content=XYOracleNetwork/tool-dapper-react&utm_campaign=Badge_Grade) [![BCH compliance](https://bettercodehub.com/edge/badge/XYOracleNetwork/tool-dapper-react?branch=master)](https://bettercodehub.com/results/XYOracleNetwork/tool-dapper-react) [![DepShield Badge](https://depshield.sonatype.org/badges/XYOracleNetwork/tool-dapper-react/depshield.svg)](https://depshield.github.io) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=XYOracleNetwork_tool-dapper-react&metric=alert_status)](https://sonarcloud.io/dashboard?id=XYOracleNetwork_tool-dapper-react) [![Known Vulnerabilities](https://snyk.io/test/github/XYOracleNetwork/tool-dapper-react/badge.svg)](https://snyk.io/test/github/XYOracleNetwork/tool-dapper-react)

> The XYO Foundation provides this source code available in our efforts to advance the understanding of the XYO Procotol and its possible uses. We continue to maintain this software in the interest of developer education. Usage of this source code is not intended for production.

Check out Dapper, live at https://dapper.layerone.co to start playing with your smart contracts.

## Table of Contents

- [Part One](#part-one)
- [Part Two](#part-two)
- [Part Three](#part-three)
- [Part Four](#part-four)
- [Maintainers](#maintainers)
- [License](#license)
- [Credits](#credits)

## Part One

### Let's Get Dapper

1. When in doubt, `yarn` it out in the project directory:

```
yarn
```

2. Run dapper

```
yarn start
```

## Part Two

### Dapploy Some Contracts locally

We need to deploy some smart contracts

1. Use [Dapploy](https://github.com/XYOracleNetwork/tool-dappdeployer-node) and create your first standalone smart contact project:

```
./dapploy init
./dapploy -P
```

**or** Use [Truffle](https://truffleframework.com) to deploy your smart contracts to any Ethereum blockchain, and note the folder of your ABI, usually in `<truffle_project>/build/contracts`

## Part Three

### View Local Contracts

1. If you don't already have it, [download and install Ganache from their site](https://truffleframework.com/ganache)

2. Same with [MetaMask from their site](https://metamask.io/)

3. Configure Ganache on 8545:

- Open Ganache
- Click the Gear Icon thingy ( ⚙️ ) to open `Preferences...`.
  Make sure that port is set to 8545.
- Click "Save and Restart" in the top-right of Ganache

4. Configure Metamask network to `localhost`

- Sign into Metamask and change Network on Metamask to localhost 8545

5. Add ganache account to metamask

- In your Ganache UI, you'll see a list of ~10 addresses. Click the key icon (🔑) next to one of 'em. And then COPY the "Private Key"

6. Start dapper. This should open up `localhost:3000` in a chrome browser.

```
yarn start
```

You should see the Dapper UI with no smart contracts loaded.

## Part Four

### Play with your Smart Contracts

1. In Dapper UI, go to the settings cog and select `Local Path` and enter `<truffle_project>/build/contracts` (Priject dir from Pt. II)

2. Tap `Save` and you should be able to see the FungibleToken in the dropdown and play with it!

3. Select `name()` function and you should see the name, "Fun Token" displayed.

<img src="https://ipfs.xyo.network/ipfs/QmcyJh9suzmMjiaumeTFRMRV4rzhffNPSkcRharvg6eYPn" />

## Maintainers

- Kevin Weiler

## License

See the [LICENSE](LICENSE) file for license details.

## Credits

Made with 🔥and ❄️ by [XYO](https://www.xyo.network)
