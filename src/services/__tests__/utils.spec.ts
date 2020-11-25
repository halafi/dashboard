import { formatHours, getRepositoryName } from '../utils';

describe('#utils', () => {
  test('formatHours', () => {
    expect(formatHours(0)).toEqual('0 hours');
    expect(formatHours(123)).toEqual('0 hours');
    expect(formatHours(60 * 60)).toEqual('1 hours');
    expect(formatHours(60 * 60 * 2)).toEqual('2 hours');
    expect(formatHours(60 * 60 * 2, false)).toEqual('2');
    expect(formatHours(60 * 60 * 2, false, 2)).toEqual('2.00');
    expect(formatHours(1233213123)).toEqual('342559 hours');
  });

  test('getRepositoryName', () => {
    expect(getRepositoryName('https://github.com/halafi/dashboard')).toEqual('dashboard');
    expect(getRepositoryName('https://github.com/halafi')).toEqual('halafi');
    expect(getRepositoryName('https://github.com')).toEqual('github.com');
  });
});
