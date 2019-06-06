import { ActionSupport } from "../../core_function/actionSupport/actionSupport";
import { ProtractorBrowser } from "protractor";

export class CartPage{
    actionSupport:ActionSupport
    curBrowser:ProtractorBrowser

    constructor(browser:ProtractorBrowser){
        this.curBrowser=browser
        this.actionSupport= new ActionSupport(this.curBrowser)
    }
    
    async selectQuantity(quantity:number){
        await this.actionSupport.clickOnElement("//select[@data-test='cart-item-quantity']/option[text()='"+quantity+"']")
    }
}