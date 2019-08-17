import {MathRandomizer} from "../randomizer";

let randomizer = new MathRandomizer();

it('givenEmptyArray_returnUndefined', () => {
  const item = randomizer.getRandomItem([]);

  expect(item).toBe(undefined);
});

it('givenOneItem_returnSameItem', () => {
  const item = randomizer.getRandomItem([
    'item'
  ]);

  expect(item).toBe('item');
});

// it('givenMultipleItems_returnRandomItem', () => {
  // can't test with math implementation
// });

// it('givenMultipleItems_returnRandomItem', () => {
//   const items = [];
//   for (let i = 0; i < 100; i++) {
//     items.push('item ' + i);
//   }
//
//   const randomItems = [];
//   for (let i = 0; i < 100; i++) {
//     randomItems.push(randomizer.getRandomItem(items));
//   }
//
//   const distinctItems = {};
//   randomItems.forEach(item => {
//     if (distinctItems[item]) {
//       distinctItems[item]++;
//     } else {
//       distinctItems[item] = 1;
//     }
//   });
//   Object.values(distinctItems).forEach(value => {
//     expect(value).toBe(1);
//   })
// });

// what happens if you call getRandomItem more times then there are items in the array?
// Currently this will return an infinite loop.
