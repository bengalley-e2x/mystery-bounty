const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const revealBounty = async (bounties, player) => {
  console.log(`${player} wins a mystery bounty of.... \n\n`)
  await sleep(2000);
  const bounty = selectMysteryBounty(bounties);
  console.log(`${bounty} ! \n\n`);

  if (bounty === 0.01) {
    console.log("Unlucky, you got the TILT stick! \n")
  } else {
    console.log("Nice! \n")
  };
};

const selectMysteryBounty = (bounties) => {
  const randomIndex = Math.floor(Math.random() * bounties.length);

  return bounties[randomIndex];
};

const calculateBounties = (entry, players) => {
  let total = entry * players;
  const prizes = [];
  let remainingPlayers = players;

  for (let i = 0; i < players; i++) {
    let value;

    if (remainingPlayers === players) {
      value = 0.01
    } else {
      value = Math.floor(Math.random() * ((total/remainingPlayers) * 100)) / 100;
    };

    if (remainingPlayers > 1 ) {
      remainingPlayers -= 1;
      prizes.push(Number(value.toFixed(2)));
      total -= value;
    } else {
      prizes.push(Number(total.toFixed(2)));
    };
  };

  console.log(`Here are the available prizes: \n\n ${prizes} \n`)
 
  return prizes;
};

const bountyPool = calculateBounties(5, 10);

revealBounty(bountyPool, "Will Kassouf");

