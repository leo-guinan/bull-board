import * as bullBoard from '@leo-guinan/api';

describe('lib public interface', () => {
  it('should save the interface', () => {
    expect(bullBoard).toMatchInlineSnapshot(`
      {
        "createBullBoard": [Function],
      }
    `);
  });
});
