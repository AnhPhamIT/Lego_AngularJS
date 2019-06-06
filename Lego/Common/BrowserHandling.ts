import {browser, ProtractorBrowser} from 'protractor';

export class BrowserHandling {
  curBrowser: ProtractorBrowser
  constructor(browser:ProtractorBrowser){
    this.curBrowser= browser
  }
  public async openPageInNewTab(url: string) {
    await this.createNewBrowserTab();
    await this.switchToTabIndex(1)
    // await this.switchToTabNumber(1);
    await this.curBrowser.get(url);
  }

  public async createNewBrowserTab() {
    await this.curBrowser.executeScript('window.open()');
  }

  async switchToTabIndex(number:number){
    let newWindowHandle=""
    await this.curBrowser.getAllWindowHandles().then(function(handles){
      newWindowHandle = handles[number];
      console.log("**** " + newWindowHandle)
      
    })
    await this.curBrowser.switchTo().window(newWindowHandle);
  }

  // public async switchToTabNumber(number: number) {
  //   await this.curBrowser.getAllWindowHandles().then(function(value){
  //     console.log("**** " + value)
  //   })
  //   return await this.curBrowser.getAllWindowHandles().then(function (handles) {
  //     debugger
  //     const newWindowHandle = handles[number];
  //     this.curBrowser.switchTo().window(newWindowHandle);
  //   });
  // }

}
