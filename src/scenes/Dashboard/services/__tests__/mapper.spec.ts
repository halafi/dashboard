import { mapperPrMetrics } from '../mapper';

describe('#mapperPrMetrics', () => {
  it('works', () => {
    expect(mapperPrMetrics([])).toEqual([]);
    expect(
      mapperPrMetrics([
        {
          date: 'any string',
          values: [null, 123],
        },
        {
          date: '1/1/2008',
          values: ['55550s', 140],
        },
      ]),
    ).toEqual([
      {
        date: 'any string',
        prReviewTime: null,
        prOpened: 123,
      },
      {
        date: '1/1/2008',
        prReviewTime: 55550,
        prOpened: 140,
      },
    ]);
  });
});
