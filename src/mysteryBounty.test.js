import { bountyCalculator } from './mysteryBounty.js';

describe("mystery bounty", () => {
  it("selects a random player from list", () => {
    expect(bountyCalculator()).not.toThrowError();
  });
});