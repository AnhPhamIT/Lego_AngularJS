import { browser,protractor, ProtractorBrowser, by, ElementFinder } from "protractor";

describe("Test", function(){
    let tmp2:string
    var tmp3:number
    let legoBrowser:ProtractorBrowser
    let tempailBrowser:ProtractorBrowser
    beforeEach(function(){
        console.log("-----------Before each-----------")
        // this.tmp1="hello"
        // tmp2 ="111"
        // tmp3=14344545
        legoBrowser= browser
        legoBrowser.waitForAngularEnabled(false)
        // tempailBrowser = browser.forkNewDriverInstance()
    })
    it("1",async function(){

        await legoBrowser.driver.manage().window().maximize()
        await legoBrowser.get("https://www.lego.com")

        console.log("STEP 1: Navigate to https://tempail.com/ to get a temporary email address")
        await tempailBrowser.waitForAngularEnabled(false)
        await tempailBrowser.driver.manage().window().maximize()
        await tempailBrowser.get("https://tempail.com/")
        let tempailEmail=""
        await tempailBrowser.element(by.xpath("//input[@id='eposta_adres']")).getAttribute('value').then(function(value){
            tempailEmail=value
            console.log("***Tempail email "+ tempailEmail)
        })

        console.log("STEP 2: Navigate to navigate to https://www.lego.com, create new account")
        await legoBrowser.element(by.xpath("//button[@aria-label='Accept cookies']")).click()
        await legoBrowser.element(by.xpath("//div[contains(text(),'EXPLORE')]")).click()
        await legoBrowser.element(by.xpath("//button[contains(@class,'l-login__profile')]/descendant::div[text()='Account']/ancestor::button")).click()
        await legoBrowser.element(by.xpath("//a[contains(text(),'Create Account')]")).click()
        await legoBrowser.sleep(3000)
        await legoBrowser.element(by.xpath("//input[@id='email']")).sendKeys(tempailEmail)
        await legoBrowser.element(by.xpath("//input[@id='password']")).sendKeys("qwertyui890")
        await legoBrowser.element(by.xpath("//input[@id='password2']")).sendKeys("qwertyui890")
        await legoBrowser.element(by.xpath("//select[@id='month']")).sendKeys("May")
        await legoBrowser.element(by.xpath("//select[@id='day']")).sendKeys("22")
        await legoBrowser.element(by.xpath("//select[@id='year']")).sendKeys("2000")
        let gender="Female"
        await legoBrowser.element(by.xpath("//select[@id='gender']")).sendKeys(gender)
        await legoBrowser.element(by.xpath("//select[@id='country']")).sendKeys("Grenada/Carricou")
        await legoBrowser.executeScript("document.getElementById('enusXX02').click()")
        await legoBrowser.element(by.xpath("//button[@aria-label='Accept cookies']")).click()
        await legoBrowser.sleep(3000)
        await legoBrowser.element(by.xpath("//button[text()='Next']")).click()
        await legoBrowser.element(by.xpath("//button[text()='Next']")).click()

        await tempailBrowser.sleep(15000)
        let activaionCode=""
        await tempailBrowser.element(by.xpath("//div[contains(text(),'LEGO')]")).click()
        await tempailBrowser.switchTo().frame(tempailBrowser.driver.findElement(by.id("iframe")))
        await tempailBrowser.element(by.xpath("//h2[text()='Activation code']/parent::th/h1")).getText().then(function(value){
            activaionCode = value
            console.log("***Activation code " + activaionCode)
        })

        for (let index = 0; index < activaionCode.length; index++) {
            const ele = activaionCode[index];
            console.log("Digit " + index + "is " + ele)
            await legoBrowser.element(by.xpath("//input[@id='code"+ (index +1) +"']")).sendKeys(activaionCode[index])
        }
        await legoBrowser.element(by.xpath("//button[text()='Next']")).click()
        await legoBrowser.element(by.xpath("//button[text()='Next']")).click()
        await legoBrowser.sleep(3000)
        
        await expect(legoBrowser.element(by.xpath("//p[text()='Your new LEGO® Account is ready to be used.']")).isDisplayed()).toBe(true)
        await legoBrowser.element(by.xpath("//button[text()='Close']")).click()

        await legoBrowser.sleep(6000)
        let loginAvartar_ele =legoBrowser.element(by.xpath("//img[@class='l-profile__avatar js-avatar']"))

        await expect(loginAvartar_ele.getAttribute('src').then(function(value){
            console.log("***Avarta src " + value)
        })).toContain('https://services.avatarinventory.lego.com')
        
        await legoBrowser.sleep(10000)
        console.log("-----------it-----------")
        // console.log("it " + this.tmp1)
        // console.log("it " + tmp2)
        // console.log("it " + tmp3)
    })

    fit("test", async function(){
        //furkunarza@desoz.com
        await legoBrowser.driver.manage().window().maximize()
        await legoBrowser.get("https://www.lego.com")
        await legoBrowser.element(by.xpath("//button[@aria-label='Accept cookies']")).click()
        await legoBrowser.element(by.xpath("//div[contains(text(),'EXPLORE')]")).click()

        await legoBrowser.element(by.xpath("//button[contains(@class,'l-login__profile')]/descendant::div[text()='Account']/ancestor::button")).click()
        await legoBrowser.sleep(1000)
        await legoBrowser.element(by.xpath("//button[contains(text(),'Log in')]")).click()
        await legoBrowser.sleep(3000)
        await legoBrowser.element(by.xpath("//input[@id='username']")).sendKeys("furkunarza@desoz.com")
        await legoBrowser.element(by.xpath("//input[@id='password']")).sendKeys("qwertyui890")
        await legoBrowser.sleep(3000)
        await legoBrowser.element(by.xpath("//button[@aria-label='Accept cookies']")).click()
        await legoBrowser.element(by.xpath("//button[@id='loginBtn']")).click()

        await legoBrowser.sleep(10000)
        let loginAvartar_ele =legoBrowser.element(by.xpath("//img[@class='l-profile__avatar js-avatar']"))

        await loginAvartar_ele.getAttribute('src').then(function(value){
            console.log("***Avarta src " + value)
        })
        await expect(loginAvartar_ele.getAttribute('src')).toContain("https://services.avatarinventory.lego.com")
        await legoBrowser.element(by.xpath("//a[contains(text(),'New Sets')]")).click()

        await legoBrowser.sleep(2000)

        try {
            await legoBrowser.element(by.xpath("//*[contains(text(),'New Sets')]/ancestor::div[1]/following::li[2]/descendant::img")).click()    
        } catch (error) {
            await legoBrowser.element(by.xpath("//map[@name='IPEMap']/area[@alt='no']")).click()    
            await legoBrowser.element(by.xpath("//*[contains(text(),'New Sets')]/ancestor::div[1]/following::li[2]/descendant::img")).click()    
        }
        await legoBrowser.sleep(3000)
        await legoBrowser.element(by.xpath("//div[@class='details__sidebar']/descendant::span[@class='product-id__name']")).getText().then(function(value){
            debugger
            console.log("*** NEW SETS: product item 2 " + value)
        })
        debugger
        await legoBrowser.element(by.xpath("//div[@class='details__sidebar']/descendant::a[contains(text(),'Add to wishlist')]")).click()
        await legoBrowser.sleep(10000)
    })

    

    afterEach(function(){
        console.log("-----------after each-----------")
        // console.log("aftereach " + this.tmp1)
        // console.log("aftereach " + tmp2)
        // console.log("aftereach " + tmp3)
    })
})