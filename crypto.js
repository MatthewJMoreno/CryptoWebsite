const supportedCoins = ['bitcoin', 'ethereum', 'litecoin'];

const fetch_coin_data = async (coin) =>{
  const requestFirstHalf = 'https://api.cryptonator.com/api/ticker/';
  const requestSecondHalf = '-usd';
  let requestString = requestFirstHalf.concat(coin);
  requestString = requestString.concat(requestSecondHalf);
  console.log(requestString)
  const request = await fetch(requestString);
  const response = await request.json();
  const {ticker: {price: price}} = response;
  const {ticker: {change: change}} = response;
  const {ticker: {volume: volume}} = response;
  return {price: parseFloat(price), change: parseFloat(change), volume: parseFloat(volume)};
};

const update_coin_data = (coin) => {
  let coin_data = null;
  if (coin === 'bitcoin'){
    coin_data = fetch_coin_data('btc');
  } else if (coin === 'litecoin'){
    coin_data = fetch_coin_data('ltc');
  } else if (coin === 'ethereum'){
    coin_data = fetch_coin_data('eth');
  }

  coin_data.then((data) =>{
    let queryString = '#'.concat(coin);
    document.querySelector(queryString.concat('-price')).textContent = data.price.toFixed(2);
    document.querySelector(queryString.concat('-change')).textContent = data.change.toFixed(2);
    document.querySelector(queryString.concat('-volume')).textContent = data.volume.toFixed(2);
  }).catch((err) =>{
    console.log(err);
  });
};

for (let coin of supportedCoins){
  update_coin_data(coin);
}