import { classNames } from './elementHelpers';

describe('elementHelpers', () => {
  describe('classNames', () => {
    it('should return a string with the correct classes', () => {
      expect(classNames({
        'classOne': true,
        'classTwo': 1,
        'classThree': false
      })).toBe('classOne classTwo');
    });
  });
});
