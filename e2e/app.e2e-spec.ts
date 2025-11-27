import { IpnetunivuiPage } from './app.po';

describe('ipnetunivui App', () => {
  let page: IpnetunivuiPage;

  beforeEach(() => {
    page = new IpnetunivuiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
