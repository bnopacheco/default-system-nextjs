import Utils from './utils';

test('should return a string with first char uppercase', () => {
    expect(Utils.firstUppercase('string')).toBe('String');
});
