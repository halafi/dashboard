import { mapperPullRequestsOpen, getAveragePrsPerRepo } from '../utils';

describe('#utils', () => {
  test('mapperPullRequestsOpen', () => {
    const input = [
      {
        forRepositories: ['https://github.com/halafi/dashboard'],
        values: [
          {
            date: '',
            prReviewTime: null,
            prOpened: 12,
          },
        ],
      },
      {
        forRepositories: ['https://github.com/halafi/google'],
        values: [
          {
            date: '',
            prReviewTime: null,
            prOpened: 33,
          },
        ],
      },
    ];
    expect(mapperPullRequestsOpen(input)).toEqual([
      {
        name: 'https://github.com/halafi/dashboard',
        prOpened: 12,
        fill: '#60A5FA',
      },
      {
        name: 'https://github.com/halafi/google',
        prOpened: 33,
        fill: '#3b83f6',
      },
    ]);
  });

  test('getAveragePrsPerRepo', () => {
    expect(getAveragePrsPerRepo([])).toEqual(0);
    expect(
      getAveragePrsPerRepo([
        {
          name: 'https://github.com/halafi/dashboard',
          prOpened: 12,
          fill: '#60A5FA',
        },
        {
          name: 'https://github.com/halafi/google',
          prOpened: 33,
          fill: '#3b83f6',
        },
      ]),
    ).toEqual(22.5);
  });
});
