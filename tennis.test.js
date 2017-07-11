const { Match, pointsGenerator } = require("./tennis");

test("should be 15-0 when playerA score a point", () => {
  const match = new Match();
  match.scorePoint("playerA");
  expect(match.getScore()).toBe("0/0 15-0");
});

test("should be 30-0 when playerA score two times", () => {
  const match = new Match();
  match.scorePoint("playerA");
  match.scorePoint("playerA");
  expect(match.getScore()).toBe("0/0 30-0");
});

test("should be 40-0 when playerA score three times", () => {
  const match = new Match();
  match.scorePoint("playerA");
  match.scorePoint("playerA");
  match.scorePoint("playerA");
  expect(match.getScore()).toBe("0/0 40-0");
});

test("should be 30-15 when playerA score two times and playerB score one time", () => {
  const match = new Match();
  match.scorePoint("playerA");
  match.scorePoint("playerA");
  match.scorePoint("playerB");
  expect(match.getScore()).toBe("0/0 30-15");
});

test("generator should return the correct next number of point", () => {
  const nextPoint = pointsGenerator();
  expect(nextPoint.next().value).toBe(0);
  expect(nextPoint.next().value).toBe(15);
  expect(nextPoint.next().value).toBe(30);
  expect(nextPoint.next().value).toBe(40);
  expect(nextPoint.next(30).value).toBe("win");
});

test("generator should return the correct next number of point in case of advantage", () => {
  const nextPoint = pointsGenerator();
  expect(nextPoint.next().value).toBe(0);
  expect(nextPoint.next().value).toBe(15);
  expect(nextPoint.next().value).toBe(30);
  expect(nextPoint.next().value).toBe(40);
  expect(nextPoint.next(40).value).toBe("A");
});

test("generator should return win in case of advantage for A if A scores", () => {
  const nextPoint = pointsGenerator();
  expect(nextPoint.next().value).toBe(0);
  expect(nextPoint.next().value).toBe(15);
  expect(nextPoint.next().value).toBe(30);
  expect(nextPoint.next().value).toBe(40);
  expect(nextPoint.next("D").value).toBe("win");
});

test("generator should return deuce in case of advantage for A if A scores", () => {
  const nextPoint = pointsGenerator();
  expect(nextPoint.next().value).toBe(0);
  expect(nextPoint.next().value).toBe(15);
  expect(nextPoint.next().value).toBe(30);
  expect(nextPoint.next().value).toBe(40);
  expect(nextPoint.next("A").value).toBe("D");
  expect(nextPoint.next("D").value).toBe("A");
  expect(nextPoint.next("A").value).toBe("D");
  expect(nextPoint.next("D").value).toBe("A");
  expect(nextPoint.next("A").value).toBe("D");
  expect(nextPoint.next("D").value).toBe("A");
});

test("should be 1/0 0-0 when playerA score after the score is 40-15", () => {
  const match = new Match();
  match.scorePoint("playerA");
  match.scorePoint("playerA");
  match.scorePoint("playerB");
  match.scorePoint("playerA");
  match.scorePoint("playerA");
  expect(match.getScore()).toBe("1/0 0-0");
});

test("should be 0/1 0-0 when playerB score after the score is 15-40", () => {
  const match = new Match();
  match.scorePoint("playerB");
  match.scorePoint("playerB");
  match.scorePoint("playerA");
  match.scorePoint("playerB");
  match.scorePoint("playerB");
  expect(match.getScore()).toBe("0/1 0-0");
});

test("should be 0/0 40-A when playerB score after the score is 40-40", () => {
  const match = new Match();
  match.scorePoint("playerB");
  match.scorePoint("playerB");
  match.scorePoint("playerA");
  match.scorePoint("playerA");
  match.scorePoint("playerA");
  match.scorePoint("playerB");
  match.scorePoint("playerB");
  expect(match.getScore()).toBe("0/0 Adv B");
});

test("should be 0/0 40-A when playerB score after the score is 40-40", () => {
  const match = new Match();
  match.scorePoint("playerB");
  match.scorePoint("playerB");
  match.scorePoint("playerA");
  match.scorePoint("playerA");
  match.scorePoint("playerA");
  match.scorePoint("playerB");
  match.scorePoint("playerB");
  match.scorePoint("playerA");
  expect(match.getScore()).toBe("0/0 Deuce");
  match.scorePoint("playerA");
  expect(match.getScore()).toBe("0/0 Adv A");
});
