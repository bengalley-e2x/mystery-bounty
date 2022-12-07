export function bountyCalculator(entries, valuePerBuyIn) {
  const bountyPool = entries * valuePerBuyIn;

  const topWeight =  0.7;
  const middleWeight = 0.1;
  const rest = 0.2;

  const selectRandomPlayer = (players) => {
    const randomIndex = Math.floor(Math.random() * players.length);

    return players[randomIndex];
  };

  let players = [
    ["LongRunG", 4], 
    ["Will Kassouf", 2],
    ["Plank", 3], 
    ["Nathan", 2],
    ["Quadzilla", 4], 
    ["BeefyBalls",2], 
    ["Nuts", 1],
    ["Davies", 2],
    ["Thanos", 3],
  ];

  const top = selectRandomPlayer(players);

  top[1] -= 1;

  const middle = selectRandomPlayer(players);

  middle[1] -= 1;

  console.log(`The top bounty prize of £ ${topWeight * bountyPool} goes to... ${top[0]} ! \n`);

  console.log(`The second bounty prize of £ ${middleWeight * bountyPool} goes to... ${middle[0]} ! \n`);

  const restOfPool = bountyPool * rest;
  const restOfEntries = entries - 2;
  
  let remainingPool = restOfPool;
  let remainingEntries = restOfEntries;

  function splitChunks(array, chunkSize) {
    const res = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      res.push(chunk);
    };
    return res;
  };

  function splitRest() {
    const tokens = []

    while (remainingEntries > 0) {
      for (let i = 0; i < remainingEntries; i++) {
        let value = Math.floor(Math.random() * ((remainingPool/remainingEntries) * 100)) / 100;
        remainingPool -= value;
        tokens.push(value);
      };
      remainingEntries -= 1;
    };
  
    const split = splitChunks(tokens, (restOfEntries/2 + 1));
    const pools = split.map((pool) => pool.reduce((a,b) => a + b));

    return pools;
  };
  
  const randomBounties = splitRest();

  let remainingBounties = randomBounties;

  let remainingPlayers = players;

  function allocateRest() {
    while (remainingBounties.length > 0) {
      remainingBounties.forEach((bounty, index) => {
        let player = selectRandomPlayer(remainingPlayers);
        if (player[1] > 0) {
          console.log(`${player[0]} wins a mystery bounty of... £ ${bounty.toFixed(2)} ! \n`);
          remainingBounties.splice(index, 1);
          player[1] -= 1;
        } else {
          remainingPlayers = players.filter((eliminate) => !eliminate.includes(player[0]));
        };
      });
    };
  };

  allocateRest();
};

bountyCalculator(23, 5);
