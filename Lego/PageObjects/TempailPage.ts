import {ActionSupport} from '../../core_function/actionSupport/actionSupport'
import { ProtractorBrowser, by } from 'protractor';
import { debug } from 'util';

export class TempailPage{
    actionSupport:ActionSupport
    curBrowser:ProtractorBrowser
    tmpEmail:string
    legoEmail:string
    activationCode:string
    constructor(browser:ProtractorBrowser){
        // this.curBrowser = browser.forkNewDriverInstance()

        this.curBrowser=browser
        this.actionSupport = new ActionSupport(this.curBrowser)
        // this.curBrowser.waitForAngularEnabled(false)
        // this.curBrowser.driver.manage().window().maximize()
        // this.curBrowser.get("https://tempail.com/en/")
        
        this.tmpEmail="//input[@id='eposta_adres']"
        this.legoEmail="//div[contains(text(),'LEGO')]"
        this.activationCode="//h2[text()='Activation code']/parent::th/h1"
    }

    async getTmpEmail(){
        return await this.curBrowser.element(by.xpath(this.tmpEmail)).getAttribute('value')
    }

    async selectOnLegoEmail(){
        await this.actionSupport.clickOnElement(this.legoEmail)
    }

    async getActivationCode(){
        await this.selectOnLegoEmail()
        await this.curBrowser.switchTo().frame(this.curBrowser.driver.findElement(by.id("iframe")))
        await this.actionSupport.waitForElementDisplayed(this.activationCode)
        return await this.curBrowser.element(by.xpath(this.activationCode)).getText()
    }
}