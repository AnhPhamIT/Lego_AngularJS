import { ProtractorBrowser, protractor, by, ElementFinder } from "protractor";
import { ActionSupport } from "../../core_function/actionSupport/actionSupport";
import { PopupHandling } from "../Common/PopupHandling";

export class HomePage{
    curBrowser:ProtractorBrowser
    actionSupport: ActionSupport
    popupHandling:PopupHandling
    
    explore:string
    account_btn:string
    createAccount_lnk:string
    login_lnk:string
    email_input:string
    password_input:string
    confirmPass_input:string
    month_dll:string
    day_dll:string
    year_dll:string
    gender_dll:string
    country_dll:string
    acceptTerm_cbx:string
    next_btn:string
    newAccount_msg:string
    close_btn:string
    loginAvarta:string

    emailLogin_input:string
    passwordLogin_input:string
    login_btn:string

    //New Sets section
    newSet_section:string

    constructor(browser:ProtractorBrowser){
        this.curBrowser= browser
        this.actionSupport = new ActionSupport(this.curBrowser)
        this.popupHandling = new PopupHandling(this.curBrowser)
        
        this.explore="//div[contains(text(),'EXPLORE')]"
        this.account_btn ="//button[contains(@class,'l-login__profile')]/descendant::div[text()='Account']/ancestor::button"
        this.createAccount_lnk ="//a[contains(text(),'Create Account')]"
        this.login_lnk="//button[contains(text(),'Log in')]"
        this.email_input="//input[@id='email']"
        this.password_input="//input[@id='password']"
        this.confirmPass_input="//input[@id='password2']"
        this.month_dll="//select[@id='month']"
        this.day_dll="//select[@id='day']"
        this.year_dll="//select[@id='year']"
        this.gender_dll="//select[@id='gender']"
        this.country_dll ="//select[@id='country']"
        this.acceptTerm_cbx="//input[@name='tos']/parent::div"
        this.next_btn="//button[text()='Next']"
        this.newAccount_msg="//p[text()='Your new LEGO® Account is ready to be used.']"
        this.close_btn="//button[text()='Close']"
        this.loginAvarta="//button/descendant::img[@class='l-profile__avatar js-avatar']"

        this.emailLogin_input="//input[@id='username']"
        this.passwordLogin_input="//input[@id='password']"
        this.login_btn="//button[@id='loginBtn']"

        this.newSet_section="//a[contains(text(),'New Sets')]"
    }

    async selectExplore(){
        await this.actionSupport.clickOnElement(this.explore)
    }

    async selectAccount(){
        await this.actionSupport.clickOnElement(this.account_btn)
    }

    async selectCreateAccount(){
        await this.actionSupport.clickOnElement(this.createAccount_lnk)
    }

    async inputEmail(value:string){
        await this.actionSupport.sendKeysOnElement(this.email_input,value)
    }

    async inputPassword(value:string){
        await this.actionSupport.sendKeysOnElement(this.password_input,value)
    }

    async inputConfirmPass(value:string){
        await this.actionSupport.sendKeysOnElement(this.confirmPass_input, value)
    }

    async selectDOB(month:string, day:string, year:string){
        await this.actionSupport.sendKeysOnElement(this.month_dll,month)
        await this.actionSupport.sendKeysOnElement(this.day_dll, day)
        await this.actionSupport.sendKeysOnElement(this.year_dll,year)
    }

    async selectGender(value:string){
        await this.actionSupport.sendKeysOnElement(this.gender_dll,value)
    }

    async selectCountryRegion(value:string){
        await this.actionSupport.sendKeysOnElement(this.country_dll,value)
    }

    async selectAcceptTermAndConditions(){
        // await this.actionSupport.clickOnElement("//a[text()='Accept terms and conditions']")
        await this.curBrowser.executeScript("document.getElementById('enusXX02').click()")
        // await this.actionSupport.clickOnElement(this.acceptTerm_cbx)
        
    }

    async selectNext(){
        await this.actionSupport.clickOnElement(this.next_btn)
        await this.actionSupport.clickOnElement(this.next_btn)
    }
    getActivationCode_xpath(index:number){
        return "//input[@id='code"+index +"']"
    }
    async inputActivationCode(value:string){
        for (let index = 0; index < value.length; index++) {
            const ele = value[index];
            console.log("Digit " + index + "is " + ele)
            await this.actionSupport.sendKeysOnElement(this.getActivationCode_xpath(index+1),ele)
        }
    }
    async selectNextOnActivationCode(){
        await this.actionSupport.clickOnElement(this.next_btn)
    }
    async isNewAccountMsgDisplayed(){
        await this.actionSupport.waitForElementDisplayed(this.newAccount_msg)
        return await this.curBrowser.element(by.xpath(this.newAccount_msg)).isDisplayed()
    }

    async selectCloseToFinishCreatingAccount(){
        await this.actionSupport.clickOnElement(this.close_btn)
    }

    async getLoginAvartaSrc(){
        // await this.curBrowser.sleep(6000)
        let avartaSrc=""
        await this.actionSupport.waitForElementDisplayed(this.loginAvarta)
        let ele=this.curBrowser.element(by.xpath(this.loginAvarta))
        await this.curBrowser.wait(function() {
            return ele.getAttribute('src').then(function(value) {
                if(value.length>0){
                    avartaSrc= value
                    console.log("HomePage: " + avartaSrc)
                    return true
                }
            });
        }, 10000);
        // return await this.curBrowser.element(by.xpath(this.loginAvarta)).getAttribute('src')
        return avartaSrc
    }

    async selectLoginLink(){
        await this.actionSupport.clickOnElement(this.login_lnk)
    }

    async loginToLego(email:string, pass:string){
        await this.actionSupport.sendKeysOnElement(this.emailLogin_input,email)
        await this.actionSupport.sendKeysOnElement(this.passwordLogin_input,pass)
        await this.popupHandling.acceptCookies()  
        await this.actionSupport.clickOnElement(this.login_btn)
    }

    async selectNewSet(){
        await this.actionSupport.clickOnElement(this.newSet_section)
    }

    async selectNewSetItemByIndex(index:number){
        try {
            await this.curBrowser.sleep(3000)
            await this.actionSupport.clickOnElement("//*[contains(text(),'New Sets')]/ancestor::div[1]/following::li["+ index +"]/descendant::img")
        } catch (error) {
            // await this.actionSupport.clickOnElement(this.popupHandling.advertiseNo)
            await this.popupHandling.dismissAdvertise()
            await this.actionSupport.clickOnElement("//*[contains(text(),'New Sets')]/ancestor::div[1]/following::li["+ index +"]/descendant::img")
        }
    }
}