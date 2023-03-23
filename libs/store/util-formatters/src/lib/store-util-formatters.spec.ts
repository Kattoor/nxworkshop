import { formatRating } from './store-util-formatters';

describe('storeUtilFormatters', () => {
  it('should work', () => {
    expect(formatRating()).toEqual(expect.any(String));
  });
});
