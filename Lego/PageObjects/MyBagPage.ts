import { ActionSupport } from "../../core_function/actionSupport/actionSupport";
import { ProtractorBrowser, by } from "protractor";

export class MyBagPage{
    actionSupport:ActionSupport
    curBrowser:ProtractorBrowser

    productName:string
    totalPrice:string
    editCheckout:string
    constructor(browser: ProtractorBrowser){
        this.curBrowser=browser
        this.actionSupport=new ActionSupport(this.curBrowser)

        this.productName="//a[@class='BasketItem__ItemNameLink-sc-11doktz-4 hRMFqw']/descendant::span[2]"
        this.editCheckout="//a[text()='Edit / Checkout']"
        this.totalPrice="//div[@type='basket']/descendant::span[text()='Order Total']/following::span[2]"
    }

    async getProductName(){
        await this.actionSupport.waitForElementDisplayed(this.productName)
        return await this.curBrowser.element(by.xpath(this.productName)).getText()
    }

    async selectEditCheckout(){
        await this.actionSupport.clickOnElement(this.editCheckout)
    }

    async printAllProductDetailsOnMyBag(numberOfProduct:number){
        for (let index = 1; index <= numberOfProduct; index++) {
            let productName_xpath="//div[@type='basket']/descendant::div[contains(@class,'BasketItem__Wrapper')]["+index+"]/div[contains(@class,'BasketItem__ItemInfoHolder')]/descendant::span[3]/span"
            let productPrice_xpath="//div[@type='basket']/descendant::div[contains(@class,'BasketItem__Wrapper')]["+index+"]/div[contains(@class,'ItemPricing__Wrapper')]/span[2]/span"
            await this.actionSupport.waitForElementDisplayed(productName_xpath)
            await this.curBrowser.element(by.xpath(productName_xpath)).getText().then(function(value){
                console.log("MyBagPage - product name: " + value)
            })

            await this.curBrowser.element(by.xpath(productPrice_xpath)).getText().then(function(value){
                console.log("MyBagPage - product price " + value)
            })
        }
    }
    async printTotalPrice(){
        await this.actionSupport.waitForElementDisplayed(this.totalPrice)
        await this.curBrowser.element(by.xpath(this.totalPrice)).getText().then(function(value){
            console.log("MyBagPage - Total Price: "+ value)
        })
    }
}