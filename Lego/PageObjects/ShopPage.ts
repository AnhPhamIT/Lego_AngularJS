import { ActionSupport } from "../../core_function/actionSupport/actionSupport";
import { ProtractorBrowser, by } from "protractor";
import { PopupHandling } from "../Common/PopupHandling";

export class ShopPage{
    actionSupport:ActionSupport
    curBrowser:ProtractorBrowser
    popupHandling: PopupHandling

    pageHeader:string
    remove_chbx:string
    accept_btn:string
    topSellingNext_btn:string
    addToBagTopSelling:string
    addToBagJustThisMonth:string
    constructor(browser:ProtractorBrowser){
        this.curBrowser= browser
        this.actionSupport= new ActionSupport(this.curBrowser)
        this.popupHandling = new PopupHandling(this.curBrowser)

        this.pageHeader="//div[@id='main-content']/descendant::div[@data-test='page-header']/h1"
        this.remove_chbx="//div[text()='REMOVE']"
        this.accept_btn="//span[text()='ACCEPT']/parent::button"
        this.topSellingNext_btn="//span[text()='Our top-selling exclusives']/following::button[@aria-label='contentPage.carousel.nextProducts']"
        this.addToBagTopSelling="//span[text()='Our top-selling exclusives']/following::ul[1]/li[@tabindex=0][1]/descendant::button[text()='Add to Bag']"
        this.addToBagJustThisMonth="//span[text()='Just in this month']/following::ul[1]/li[@tabindex=0][1]/descendant::button[text()='Add to Bag']"
    }

    async getPageHeaderText(){
        await this.actionSupport.waitForElementDisplayed(this.pageHeader)
        await this.curBrowser.sleep(2000)
        return await this.curBrowser.element(by.xpath(this.pageHeader)).getText()
    }

    async selectRemoveItem(){
        await this.actionSupport.clickOnElement(this.remove_chbx)
    }

    async selectAccept(){
        await this.actionSupport.clickOnElement(this.accept_btn)
    }

    async addProductToWishListByIndex(productIndex:number){
        await this.actionSupport.clickOnElement("//li[@class='ProductGridstyles__Item-lc2zkx-1 lmseAP']["+productIndex+"]/descendant::span[text()='Add to Wish List'][2]")
    }

    async addFirstProductToWishList(n:number){
        await this.curBrowser.sleep(6000)

        for (let index = 1; index <= n; index++) {
            try {
                await this.addProductToWishListByIndex(index) 
            } catch (error) {
                // await this.actionSupport.clickOnElement(this.popupHandling.advertiseNo)
                await this.popupHandling.dismissAdvertise()
                await this.addProductToWishListByIndex(index) 
            }
            await this.addProductToWishListByIndex(index) 
        }
    }

    async selectNextProduct(section:string){
        let ele=this.curBrowser.element(by.xpath("//span[text()='"+section+"']/following::ul[1]/li[@tabindex=0][1]/descendant::div[@data-test='product-leaf-price']/descendant::span[2]/span"))
        await this.curBrowser.actions().mouseMove(ele).perform()
        await this.curBrowser.actions().click().perform()
        await this.actionSupport.clickOnElement("//span[text()='"+section+"']/following::button[@aria-label='contentPage.carousel.nextProducts']")
    }

    async selectHighestPriceProduct(section:string){
        let maxPrice=0
        let price=0
        await this.curBrowser.sleep(2000)
        for (let index = 1; index <= 4; index++) {
            await this.actionSupport.waitForElementDisplayed("//span[text()='"+section+"']/following::ul[1]/li[@tabindex=0]["+index+"]/descendant::div[@data-test='product-leaf-price']/descendant::span[2]/span")
            await this.curBrowser.element(by.xpath("//span[text()='"+section+"']/following::ul[1]/li[@tabindex=0]["+index+"]/descendant::div[@data-test='product-leaf-price']/descendant::span[2]/span")).getText().then(function(value){
                price=Number(value.substring(1))
                console.log("ShopPage: "+price)
                if(maxPrice<price){
                    maxPrice=price
                }
            })
        }
        console.log("Max price: " + maxPrice)
        await this.actionSupport.clickOnElement("//span[text()='"+section+"']/following::ul[1]/li[@tabindex=0]/descendant::div[@data-test='product-leaf-price']/descendant::span[2]/span[contains(text(),'"+maxPrice+"')]/ancestor::div[4]/descendant::button[text()='Add to Bag']")
    }

    async isAddToBagTopSelling(){
        await this.curBrowser.sleep(3000)
        return await this.curBrowser.element(by.xpath(this.addToBagTopSelling)).isPresent()
    }

    async isAddToBagJustThisMonth(){
        // await this.actionSupport.waitForElementDisplayed(this.addToBagJustThisMonth)
        await this.curBrowser.sleep(3000)
        return await this.curBrowser.element(by.xpath(this.addToBagJustThisMonth)).isPresent()
    }

    
}