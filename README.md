# farcaster-expo-example

An example Farcaster mobile app using Neynar, Expo, and React Native
Inspired by this [bounty from dwr.eth](https://warpcast.com/dwr.eth/0x5727a985)

Built by [dylsteck.eth](https://warpcast.com/dylsteck.eth)

### How to run locally
1. Copy .env.example to .env (note: you just need your Neynar API key for now)
2. npm install
3. npm run start and then choose your platform of choice


### Short-term edits to make
- [] [Add filters to view trending casts by users with certain POAPs or NFTs using Airstack API’s](https://warpcast.com/betashop.eth/0x50d872d2)
- [] Add latest casts page
    - this will be quick, it's the same logic as trending but with a different route
- [] Style homepage and cast view pages
- [] Add pagination, either through arrows or infinite scroll

### Long-term edits to make
- [] Add write and multi-provider support with [Farcaster Kit](https://farcasterkit.com)
    - was going to use a `NeynarProvider` I've been building for this(which would've worked for auth too), but I ran into an Expo error when porting it over