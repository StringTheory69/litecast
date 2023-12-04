
// Airstack GraphQL query to get all POAPs and Ethereum NFTs given a fc_fname
export const airstackGetPoapsAndNfts = `
query MyQuery {
  Ethereum: TokenBalances(
    input: {filter: {owner: {_eq: "fc_fname:dylsteck.eth"}, tokenType: {_in: [ERC1155, ERC721]}}, blockchain: ethereum, limit: 50}
  ) {
    TokenBalance {
      owner {
        identity
      }
      amount
      tokenAddress
      tokenId
      tokenType
      tokenNfts {
        contentValue {
          image {
            small
          }
        }
        metaData {
          name
          description
        }
      }
    }
    pageInfo {
      nextCursor
      prevCursor
    }
  }
  Polygon: TokenBalances(
    input: {filter: {owner: {_eq: "fc_fname:dylsteck.eth"}, tokenType: {_in: [ERC1155, ERC721]}}, blockchain: polygon, limit: 50}
  ) {
    TokenBalance {
      owner {
        identity
      }
      amount
      tokenAddress
      tokenId
      tokenType
      tokenNfts {
        contentValue {
          image {
            small
          }
        }
      }
    }
    pageInfo {
      nextCursor
      prevCursor
    }
  }
  Poaps(
    input: {filter: {owner: {_eq: "fc_fname:dylsteck.eth"}}, blockchain: ALL, limit: 200}
  ) {
    Poap {
      poapEvent {
        eventName
        eventId
        eventURL
        isVirtualEvent
        city
        contentValue {
          image {
            extraSmall
            large
            medium
            original
            small
          }
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPrevPage
      nextCursor
      prevCursor
    }
  }
}
`
// get all fnames of wallets that hold a certain tokenAddress on ETH
export const airstackGetFarcasterEthTokenHolders = (tokenAddress: string) =>
{
  return `
  query MyQuery {
    Ethereum: TokenBalances(
      input: {filter: {tokenAddress: {_eq: "0x6eee24de6f3806b0d53fa1fe7052dd2979e123ef"}}, blockchain: ethereum, limit: 50}
    ) {
      TokenBalance {
        owner {
          socials(
            input: {filter: {dappName: {_eq: farcaster}}}
          ) {
            profileName
          }
        }
      }
      pageInfo {
        nextCursor
        prevCursor
      }
    }
  }
  `;
}