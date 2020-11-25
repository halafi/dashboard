import { getAverageReviewTime } from '../utils';

describe('#utils', () => {
  test('getAverageReviewTime', () => {
    expect(
      getAverageReviewTime([
        { date: '', prOpened: 0, prReviewTime: 123 },
        { date: '', prOpened: 0, prReviewTime: null },
        { date: '', prOpened: 0, prReviewTime: null },
        { date: '', prOpened: 0, prReviewTime: 345 },
      ]),
    ).toEqual(234);
  });
});
