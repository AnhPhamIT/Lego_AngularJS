import { ActionSupport } from "../../core_function/actionSupport/actionSupport";
import { ProtractorBrowser, by } from "protractor";

export class SearchPage{
    actionSupport:ActionSupport
    curBrowser:ProtractorBrowser

    sortBy_dll:string
    productName:string
    constructor(browser:ProtractorBrowser){
        this.curBrowser=browser
        this.actionSupport=new ActionSupport(this.curBrowser)

        this.sortBy_dll="//select[@data-test='sortby__box-select-field']/parent::div"
        this.productName="//li[@class='ProductGridstyles__Item-lc2zkx-1 lmseAP'][1]/descendant::span[2]"
    }

    async sortProductBy(sortOrder:string){
        // await this.actionSupport.clickOnElement(this.sortBy_dll)
        await this.actionSupport.clickOnElement("//option[text()='"+sortOrder+"']")
    }

    async selectProductType(productType:string){
        await this.actionSupport.clickOnElement("//span[contains(text(),'"+productType+"')]/preceding::div[1]")
    }

    async selectProduct(productIndex:number){
        await this.actionSupport.clickOnElement("//li[@class='ProductGridstyles__Item-lc2zkx-1 lmseAP']["+productIndex+"]/descendant::a[1]")
    }

    async getProductName(productIndex:number){
        await this.actionSupport.waitForElementDisplayed("//li[@class='ProductGridstyles__Item-lc2zkx-1 lmseAP']["+productIndex+"]/descendant::span[2]")
        return await this.curBrowser.element(by.xpath("//li[@class='ProductGridstyles__Item-lc2zkx-1 lmseAP']["+productIndex+"]/descendant::span[2]")).getText()
    }
}