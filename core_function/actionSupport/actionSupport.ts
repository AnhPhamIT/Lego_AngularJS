import {by, protractor, ProtractorBrowser, ProtractorExpectedConditions, ElementFinder} from 'protractor'

export class ActionSupport{
    curBrowser:ProtractorBrowser
    timeOut:number
    until:ProtractorExpectedConditions

    constructor(browser:ProtractorBrowser, timeOut=60000){
        this.curBrowser=browser
        this.timeOut =timeOut
        this.until = protractor.ExpectedConditions
    }

    async clickOnElement(xpath:string, timeout=this.timeOut){
        console.log("Clicking on element " + xpath)
 
        try {
            var ele= await this.curBrowser.element(by.xpath(xpath))
            await this.curBrowser.wait(this.until.presenceOf(ele),timeout, 'Element ' + xpath +' takes too long to appear in the DOM')
            await this.curBrowser.wait(this.until.elementToBeClickable(ele), this.timeOut, 'Element ' + xpath +' is NOT clickable')
            await this.curBrowser.actions().mouseMove(ele).perform()
            await ele.click()        
        } catch (error) {
            var ele= await this.curBrowser.element(by.xpath(xpath))
            await this.curBrowser.wait(this.until.presenceOf(ele),timeout, 'Element ' + xpath +' takes too long to appear in the DOM')
            await this.curBrowser.wait(this.until.elementToBeClickable(ele), this.timeOut, 'Element ' + xpath +' is NOT clickable')
            await this.curBrowser.actions().mouseMove(ele).perform()
            await ele.click()   
        }
        
       
        // await this.curBrowser.actions().click().perform()
        // await ele.sendKeys(protractor.Key.ENTER)

    }

    async sendKeysOnElement(xpath:string, data:string, timeOut=this.timeOut) {
        console.log("Sending key to element " + xpath)
        var ele:ElementFinder = await this.curBrowser.element(by.xpath(xpath))
        await this.curBrowser.wait(this.until.presenceOf(ele), timeOut, 'Element ' + xpath +' takes too long to appear in the DOM');
        await this.curBrowser.wait(this.until.elementToBeClickable(ele), timeOut, 'Element '+ xpath +' is not interactable');
        
        await ele.sendKeys(data)
    }

    async sendSingleKey(ele:ElementFinder, data:string, strIndex:number){
        await this.curBrowser.sleep(60)
        await ele.sendKeys(data.charAt(strIndex));
    }

    async getElementAttribute(xpath:string, attribute:string):Promise<string>{
        var ele:ElementFinder = await this.curBrowser.element(by.xpath(xpath))
        var attributeValue:string =""
        await this.curBrowser.wait(this.until.presenceOf(ele), this.timeOut, 'Element ' + xpath + ' takes too long to appear in the DOM' )
        
        await ele.getAttribute(attribute).then(function(value){
            console.log("Attribute value: " + value)
            attributeValue = value
        })
        return attributeValue
    }

    async getElementText(xpath:string):Promise<string>{
        var ele:ElementFinder = await this.curBrowser.element(by.xpath(xpath))
        await this.curBrowser.wait(this.until.presenceOf(ele), this.timeOut, 'Element ' + xpath + ' takes too long to appear in the DOM' )
        return await ele.getText()
    }

    async waitForElementDisplayed(xpath:string){
        var ele:ElementFinder = await this.curBrowser.element(by.xpath(xpath))
        await this.curBrowser.wait(this.until.presenceOf(ele), this.timeOut, 'Element ' + xpath + ' takes too long to appear in the DOM' )
    }
}