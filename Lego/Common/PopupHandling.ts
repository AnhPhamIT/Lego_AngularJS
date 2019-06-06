import { ActionSupport } from "../../core_function/actionSupport/actionSupport";
import { ProtractorBrowser } from "protractor";

export class PopupHandling{
    actionSupport:ActionSupport
    curBrowser: ProtractorBrowser

    acceptCookiesSetting:string
    acceptCookies_btn:string
    advertiseNo:string
    constructor(browser:ProtractorBrowser){
        this.curBrowser=browser
        this.actionSupport=new ActionSupport(this.curBrowser)

        this.acceptCookiesSetting = "//span[text()='Yes, I accept']"
        this.acceptCookies_btn="//button[@aria-label='Accept cookies']"
        this.advertiseNo ="//map[@name='IPEMap']/area[@alt='no' or @alt='No']"
    }

    async acceptCookies(){
        try {
            await this.actionSupport.clickOnElement(this.acceptCookies_btn)    
        } catch (error) {
            console.log("No cookies display")
        }
        
    }

    async acceptingCookiesSetting(){
        try {
            await this.actionSupport.clickOnElement(this.acceptCookiesSetting)    
        } catch (error) {
            console.log("No cookies setting display")   
        }
    }

    async dismissAdvertise(){
        try {
            await this.actionSupport.clickOnElement(this.advertiseNo)
        } catch (error) {
            console.log("No advertise display")
        }
    }
}