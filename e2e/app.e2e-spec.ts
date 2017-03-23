import { FinEdgePage } from './app.po';

describe('fin-edge App', () => {
  let page: FinEdgePage;

  beforeEach(() => {
    page = new FinEdgePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
