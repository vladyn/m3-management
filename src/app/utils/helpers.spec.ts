import { urlString } from "./helpers";
describe('helpers', () => {
  describe('urlString', () => {
    it('should return empty string if data is null', () => {
      const data = null;
      const result = urlString(data);
      expect(result).toEqual('');
    });

    it('should return empty string if data is an empty object', () => {
      const data = {};
      const result = urlString(data);
      expect(result).toEqual('');
    });

    it('should return a query string if data is an object', () => {
      const data = { key: 'value' };
      const result = urlString(data);
      expect(result).toEqual('key=value');
    });
  });
});