import { ActionSupport } from "../../core_function/actionSupport/actionSupport";
import { ProtractorBrowser, by, Key } from "protractor";
import { timingSafeEqual } from "crypto";

export class HeaderPage{
    actionSupport: ActionSupport
    curBrowser: ProtractorBrowser

    search_input:string
    legoShop:string
    changeRegion:string
    account:string
    logout:string
    signin:string
    legoShopOnHomePage:string
    constructor(browser: ProtractorBrowser){
        this.curBrowser=browser
        this.actionSupport= new ActionSupport(this.curBrowser)
        this.search_input="//input[@id='search-input']"
        this.legoShop="//span[text()='SHOP']/parent::a"
        this.changeRegion="//span[text()='Change Region']"
        this.account="//span[text()='Account']/ancestor::button"
        this.logout="//span[text()='Log out']/ancestor::a"
        this.signin="//a[text()='Sign In']"
        this.legoShopOnHomePage="//div[@id='gh_aria_navigation_container']/descendant::a[contains(.,'Shop')]/ancestor::li"
    }

    getWishList_xpath(itemCount:number){
        return "//span[text()='Wish list ("+itemCount+")']"
    }

    getMyBag_xpath(itemCount:number){
        return "//span[text()='My Bag ("+itemCount+")']"
    }

    async selectOnMyBag(itemCount:number){
        await this.actionSupport.clickOnElement(this.getMyBag_xpath(itemCount))
    }

    async selectOnWishList(itemCount:number){
        await this.actionSupport.clickOnElement(this.getWishList_xpath(itemCount))
    }
    async checkWishListCount(itemCount:number){
        // await this.curBrowser.refresh()
        await this.actionSupport.waitForElementDisplayed(this.getWishList_xpath(itemCount))
        return await this.curBrowser.element(by.xpath(this.getWishList_xpath(itemCount))).isDisplayed()
    }

    async searchProduct(productName:string){
        await this.actionSupport.sendKeysOnElement(this.search_input, productName)
        await this.actionSupport.sendKeysOnElement(this.search_input, Key.ENTER)
    }
    async checkMyBagCount(itemCount:number){
        await this.actionSupport.waitForElementDisplayed(this.getMyBag_xpath(itemCount))
        return await this.curBrowser.element(by.xpath(this.getMyBag_xpath(itemCount))).isDisplayed()
    }

    async selectLegoShop(){
        await this.actionSupport.clickOnElement(this.legoShop)
    }

    async selectChangeRegion(){
        await this.curBrowser.sleep(3000)
        await this.actionSupport.clickOnElement(this.changeRegion)
    }

    async selectRegion(region:string){
        await this.actionSupport.clickOnElement("//span[text()='"+region+"']")
    }

    async selectMenu(menuItem:string){
        await this.curBrowser.sleep(5000)
        await this.actionSupport.clickOnElement("//*[text()='"+menuItem+"']")
    }

    async selectSubMenu(subMenu:string){
        await this.curBrowser.sleep(1000)
        await this.actionSupport.clickOnElement("//a[text()='"+subMenu+"']")
    }

    async selectAccount(){
        await this.actionSupport.clickOnElement(this.account)
    }

    async selectLogout(){
        await this.actionSupport.clickOnElement(this.logout)
    }

    async isUserLogout(){
        await expect(this.curBrowser.element(by.xpath(this.signin)).isDisplayed()).toBe(true)
    }

    async selectShopOnHomePage(){
        await this.actionSupport.clickOnElement(this.legoShopOnHomePage)
    }
}