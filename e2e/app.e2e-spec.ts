import { AppTourPage } from './app.po';

describe('app-tour App', () => {
  let page: AppTourPage;

  beforeEach(() => {
    page = new AppTourPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
