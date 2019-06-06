import {browser, ProtractorBrowser} from 'protractor'
import { HomePage } from '../PageObjects/HomePage';
import { TempailPage } from '../PageObjects/TempailPage';
import { ProductPage } from '../PageObjects/ProductPage';
import { HeaderPage } from '../PageObjects/HeaderPage';
import { WishListPage } from '../PageObjects/WishListPage';
import { PopupHandling } from '../Common/PopupHandling';
import { SearchPage } from '../PageObjects/SearchPage';
import { MyBagPage } from '../PageObjects/MyBagPage';
import { CartPage } from '../PageObjects/CartPage';
import { ShopPage } from '../PageObjects/ShopPage';
import {BrowserHandling} from '../Common/BrowserHandling'

describe("Lego page ", function(){
    let legoHomePage: HomePage
    let tmpEmailPage: TempailPage
    let productPage: ProductPage
    let headerPage:HeaderPage
    let wishlistPage:WishListPage
    let searchPage: SearchPage
    let myBagPage:MyBagPage
    let cartPage: CartPage
    let shopPage:ShopPage
    let browserHandling:BrowserHandling

    let popupHandling:PopupHandling
    let tmpEmailBrowser:ProtractorBrowser
    let legoBrowser:ProtractorBrowser
    let activationCode=""
    let tmpEmail=""
    beforeEach(async function(){
        legoBrowser= browser
        legoHomePage= new HomePage(browser)
        productPage = new ProductPage(browser)
        headerPage = new HeaderPage(browser)
        wishlistPage= new WishListPage(browser)
        popupHandling = new PopupHandling(browser)
        searchPage= new SearchPage(browser)
        myBagPage= new MyBagPage(browser)
        cartPage= new CartPage(browser)
        shopPage= new ShopPage(browser)
        browserHandling= new BrowserHandling(browser)
        
        tmpEmailBrowser= browser.forkNewDriverInstance()
        tmpEmailPage = new TempailPage(tmpEmailBrowser)
        
    })

    fit("should allow user to create new account ", async function(){
        await legoBrowser.waitForAngularEnabled(false)
        await browser.driver.manage().window().maximize()
        await browser.get("https://www.lego.com")
        
        await tmpEmailBrowser.waitForAngularEnabled(false)
        await tmpEmailBrowser.driver.manage().window().maximize()
        await tmpEmailBrowser.get("https://tempail.com/en/")

        
        await tmpEmailPage.getTmpEmail().then(function(value){
            tmpEmail = value
            console.log("*** TEMPAIL email:" + tmpEmail)
        })

        await popupHandling.acceptCookies()
        await legoHomePage.selectExplore()
        await legoHomePage.selectAccount()
        await legoHomePage.selectCreateAccount()
        await legoHomePage.inputEmail(tmpEmail)
        await legoHomePage.inputPassword("qwertyui890")
        await legoHomePage.inputConfirmPass("qwertyui890")
        await legoHomePage.selectDOB("May","22", "2000")
        await legoHomePage.selectGender("Female")
        await legoHomePage.selectCountryRegion("Grenada/Carricou")
        await legoHomePage.selectAcceptTermAndConditions()
        await popupHandling.acceptCookies()          

        await legoHomePage.selectNext()
        
        await tmpEmailPage.getActivationCode().then(function(value){
            activationCode=value
            console.log("***ACTIVATION CODE: " + activationCode)
        })
        await legoHomePage.inputActivationCode(activationCode)
        await legoHomePage.selectNextOnActivationCode()
        await expect(legoHomePage.isNewAccountMsgDisplayed()).toBe(true)
        await legoHomePage.selectCloseToFinishCreatingAccount()

        // await legoHomePage.getLoginAvartaSrc().then(function(value){
        //     console.log("***AVARTA SRC " + value)
        // })
        await expect(legoHomePage.getLoginAvartaSrc()).toContain("https://services.avatarinventory.lego.com")
        await legoBrowser.sleep(5000)

        let wishListCount=0
        let myBagCount=0
        let productName=""
        console.log("------------------STEP 3: After login, Scroll down to New Set-------------------------------")
        await legoHomePage.selectNewSetItemByIndex(2)

        await productPage.getProductNameOnSideBar().then(function(value){
            productName= value
            console.log("*** PRODUCT NAME: " + productName)
        })

        console.log(" Click Add to wishlist")
        await legoBrowser.sleep(3000)
        await productPage.addToWishList()
        wishListCount+=1
        console.log("Verify the 2nd item of New Sets section has been correctly put into cart")
        await legoBrowser.sleep(3000)
        await expect(headerPage.checkWishListCount(wishListCount)).toBe(true)
        await wishlistPage.isProductAddedInWishList(productName)

        console.log("Click 'Delete' button to remove the item out of the Wish List")
        await popupHandling.acceptingCookiesSetting()
        await legoBrowser.sleep(5000)
        await wishlistPage.deleteItemFromWishList(productName)
        wishListCount-=1
        await expect(headerPage.checkWishListCount(wishListCount)).toBe(true)

        console.log("Search the deleted item from search box")
        let sortOrder="Name"
        await headerPage.searchProduct(productName)
        await searchPage.sortProductBy(sortOrder)
        sortOrder="Relevance"
        await searchPage.sortProductBy(sortOrder)
        await legoBrowser.sleep(3000)
        await searchPage.selectProductType("Sets")
        await searchPage.selectProductType("12+")
        await searchPage.selectProductType("$100+")

        console.log("Click on for 1st item.")
        let firstSearchedProduct=""
        await searchPage.getProductName(1).then(function(value){
            firstSearchedProduct=value
            console.log("*** First searched product " + firstSearchedProduct)
        })
        await searchPage.selectProduct(1)

        console.log("Add to Wish List with Limit =2")
        let limit=2
        await productPage.selectProductLimit(limit)
        await productPage.addToWishListMain()

        console.log("Verify item has been correctly added to WISHLIST")
        wishListCount+=1
        await expect(headerPage.checkWishListCount(wishListCount)).toBe(true)

        await wishlistPage.isProductAddedInWishList(firstSearchedProduct)

        console.log("On Wish List, click \"Move to Bag\"")
        await productPage.addToMyBag()
        myBagCount=myBagCount+ limit + 1
        // myBagCount=myBagCount+ limit
        wishListCount= wishListCount-1
        await legoBrowser.sleep(3000)
        await headerPage.checkMyBagCount(myBagCount)
        await headerPage.selectOnMyBag(myBagCount)

        await expect(myBagPage.getProductName().then(function(){
            console.log("*** Product Name on My Bag "+ firstSearchedProduct)
        }))
        await expect(myBagPage.getProductName()).toEqual(firstSearchedProduct)
        await legoBrowser.sleep(3000)
        await myBagPage.selectEditCheckout()
        await cartPage.selectQuantity(1)

        await legoBrowser.sleep(3000)
        console.log("Click on \"SHOP\" to back to homepage")
        await headerPage.selectLegoShop()
        console.log("Select \"United Kingdom / English\"")
        await headerPage.selectChangeRegion()
        await headerPage.selectRegion("United Kingdom / English")

        console.log("Page is redirected to \"Change shipping country to Great Britain\"")
        await expect(shopPage.getPageHeaderText()).toEqual("Change shipping country to Great Britain")

        await shopPage.selectRemoveItem()
        await shopPage.selectAccept()
        myBagCount=0
        await headerPage.checkMyBagCount(myBagCount)

        await legoBrowser.sleep(3000)
        console.log("Select \"CATEGORIES\" on top panel")
        await headerPage.selectMenu("Categories")
        await headerPage.selectSubMenu("Animals")
        console.log("Click \"Add to Wish List\" for first 6 items")
        await shopPage.addFirstProductToWishList(6)        
        wishListCount=wishListCount+6
        await expect(headerPage.checkWishListCount(wishListCount)).toBe(true)

        await headerPage.selectOnWishList(wishListCount)
        await legoBrowser.sleep(3000)
        await wishlistPage.selectSortOrder("Price Low")
        debugger
        console.log("******************************************Verify all items will be sorted based on price. Low price is displayed first, High price is displayed later")
        await wishlistPage.verifySortedWishListProduct(wishListCount)
        console.log("Move all 6 items to Bag by click on \"Move to Bag\" button")
        await legoBrowser.sleep(3000)
        await wishlistPage.moveProductItemsToBag(6)
        wishListCount=wishListCount-6
        myBagCount=(myBagCount+6)*limit + 1
        // myBagCount=(myBagCount+6)*limit
        await legoBrowser.sleep(5000)
        // await expect(headerPage.checkWishListCount(wishListCount)).toBe(true)
        // await expect(headerPage.checkMyBagCount(myBagCount)).toBe(true)

        console.log("--------------------STEP 4: Open new tab...-----------------------------")
        await browserHandling.openPageInNewTab("https://shop.lego.com")
        await legoBrowser.getCurrentUrl().then(function(value){
            console.log("***** current URL " + value)
        })
        await expect(legoBrowser.getCurrentUrl()).toEqual("https://shop.lego.com/en-GB/")
        await legoBrowser.sleep(5000)

        let isTopSelling =false
        let isJustThisMonth=false
        await shopPage.isAddToBagTopSelling().then(function(value){
            isTopSelling=value
        })
        await shopPage.isAddToBagJustThisMonth().then(function(value){
            isJustThisMonth=value
            debugger
        })
        if (isTopSelling){
            await shopPage.selectNextProduct("Our top-selling exclusives")
            await shopPage.selectHighestPriceProduct("Our top-selling exclusives")
            myBagCount=myBagCount+1
            await expect(headerPage.checkMyBagCount(myBagCount)).toBe(true)

            await browserHandling.switchToTabIndex(0)
            await legoBrowser.refresh()
            await headerPage.selectOnMyBag(myBagCount)
            debugger
            let numOfItems=myBagCount/2
            await myBagPage.printAllProductDetailsOnMyBag(numOfItems)
            await myBagPage.printTotalPrice()
        }else if(isJustThisMonth){
            await shopPage.selectNextProduct("Just in this month")
            await shopPage.selectHighestPriceProduct("Just in this month")
            myBagCount=myBagCount+1
            await expect(headerPage.checkMyBagCount(myBagCount)).toBe(true)

            await browserHandling.switchToTabIndex(0)
            await legoBrowser.refresh()
            await headerPage.selectOnMyBag(myBagCount)
            debugger
            let numOfItems=myBagCount/2
            await myBagPage.printAllProductDetailsOnMyBag(numOfItems)
            await myBagPage.printTotalPrice()
        }

        await headerPage.selectAccount()
        await headerPage.selectLogout()
        await headerPage.selectAccount()
        await browser.sleep(5000)
        await headerPage.isUserLogout()
        debugger
        await browser.sleep(5000)
    })

    it("should allow user to select and add items to Wish List", async function(){
        let wishListCount=0
        let myBagCount=0
        let productName=""
        await legoBrowser.waitForAngularEnabled(false)
        await browser.driver.manage().window().maximize()
        await browser.get("https://www.lego.com")

        await popupHandling.acceptCookies()
        await legoHomePage.selectExplore()
        await legoHomePage.selectAccount()
        await legoHomePage.selectLoginLink()

        await legoHomePage.loginToLego("burzefumle@desoz.com","qwertyui890")
        await expect(legoHomePage.getLoginAvartaSrc()).toContain("https://services.avatarinventory.lego.com")
        await legoHomePage.selectNewSetItemByIndex(2)

        await productPage.getProductNameOnSideBar().then(function(value){
            productName= value
            console.log("*** PRODUCT NAME: " + productName)
        })
        console.log(" Click Add to wishlist")
        await productPage.addToWishList()
        wishListCount+=1
        console.log("Verify the 2nd item of New Sets section has been correctly put into cart")
        await expect(headerPage.checkWishListCount(wishListCount)).toBe(true)
        await wishlistPage.isProductAddedInWishList(productName)

        console.log("Click 'Delete' button to remove the item out of the Wish List")
        await popupHandling.acceptingCookiesSetting()
        await wishlistPage.deleteItemFromWishList(productName)
        wishListCount-=1
        await expect(headerPage.checkWishListCount(wishListCount)).toBe(true)

        console.log("Search the deleted item from search box")
        let sortOrder="Name"
        await headerPage.searchProduct(productName)
        await searchPage.sortProductBy(sortOrder)
        sortOrder="Relevance"
        await searchPage.sortProductBy(sortOrder)
        await searchPage.selectProductType("Sets")
        await searchPage.selectProductType("12+")
        await searchPage.selectProductType("$100+")

        console.log("Click on for 1st item.")
        let firstSearchedProduct=""
        await searchPage.getProductName(1).then(function(value){
            firstSearchedProduct=value
            console.log("*** First searched product " + firstSearchedProduct)
        })
        await searchPage.selectProduct(1)

        console.log("Add to Wish List with Limit =2")
        let limit=2
        await productPage.selectProductLimit(limit)
        debugger
        await productPage.addToWishListMain()

        console.log("Verify item has been correctly added to WISHLIST")
        wishListCount+=1
        await expect(headerPage.checkWishListCount(wishListCount)).toBe(true)

        await wishlistPage.isProductAddedInWishList(firstSearchedProduct)

        console.log("On Wish List, click \"Move to Bag\"")
        await productPage.addToMyBag()
        myBagCount=myBagCount+ limit
        wishListCount= wishListCount-1
        await headerPage.checkMyBagCount(myBagCount)
        await headerPage.selectOnMyBag(myBagCount)

        await expect(myBagPage.getProductName().then(function(){
            console.log("*** Product Name on My Bag "+ firstSearchedProduct)
        }))
        await expect(myBagPage.getProductName()).toEqual(firstSearchedProduct)

        await myBagPage.selectEditCheckout()
        await cartPage.selectQuantity(1)

        console.log("Click on \"SHOP\" to back to homepage")
        await headerPage.selectLegoShop()
        console.log("Select \"United Kingdom / English\"")
        await headerPage.selectChangeRegion()
        await headerPage.selectRegion("United Kingdom / English")

        console.log("Page is redirected to \"Change shipping country to Great Britain\"")
        await expect(shopPage.getPageHeaderText()).toEqual("Change shipping country to Great Britain")

        await shopPage.selectRemoveItem()
        await shopPage.selectAccept()
        myBagCount=0
        await headerPage.checkMyBagCount(myBagCount)

        console.log("Select \"CATEGORIES\" on top panel")
        await headerPage.selectMenu("Categories")
        await headerPage.selectSubMenu("Animals")
        console.log("Click \"Add to Wish List\" for first 6 items")
        await shopPage.addFirstProductToWishList(6)        
        wishListCount=wishListCount+6
        await expect(headerPage.checkWishListCount(wishListCount)).toBe(true)

        await headerPage.selectOnWishList(wishListCount)
        await wishlistPage.selectSortOrder("Price Low")
        debugger
        console.log("******************************************Verify all items will be sorted based on price. Low price is displayed first, High price is displayed later")
        await wishlistPage.verifySortedWishListProduct(wishListCount)
        console.log("Move all 6 items to Bag by click on \"Move to Bag\" button")
        debugger
        await wishlistPage.moveProductItemsToBag(6)
        wishListCount=wishListCount-6
        myBagCount=(myBagCount+6)*limit
        await expect(headerPage.checkWishListCount(wishListCount)).toBe(true)
        await expect(headerPage.checkMyBagCount(myBagCount)).toBe(true)
        await legoBrowser.sleep(5000)
    })

    it("should allow user to add product item into MyBag and check the total price", async function(){
        let limit=2
        let myBagCount=6*limit
        await legoBrowser.waitForAngularEnabled(false)
        await browser.driver.manage().window().maximize()
        await browser.get("https://www.lego.com")
        await popupHandling.acceptCookies()
        await legoHomePage.selectExplore()
        await legoHomePage.selectAccount()
        await legoHomePage.selectLoginLink()
        await legoHomePage.loginToLego("soltipipsi@desoz.com","qwertyui890")

        await legoBrowser.sleep(5000)
        await headerPage.selectShopOnHomePage()
        await headerPage.selectMenu("Categories")
        await headerPage.selectSubMenu("Animals")

        await browserHandling.openPageInNewTab("https://shop.lego.com")
        await legoBrowser.getCurrentUrl().then(function(value){
            console.log("***** current URL " + value)
        })
        await expect(legoBrowser.getCurrentUrl()).toEqual("https://shop.lego.com/en-US/")
        await legoBrowser.sleep(5000)
        await headerPage.selectLegoShop()
        await popupHandling.acceptingCookiesSetting()
        let isTopSelling =false
        let isJustThisMonth=false
        await shopPage.isAddToBagTopSelling().then(function(value){
            isTopSelling=value
            debugger
        })
        await shopPage.isAddToBagJustThisMonth().then(function(value){
            isJustThisMonth=value
            debugger
        })
        if (isTopSelling){
            await shopPage.selectNextProduct("Our top-selling exclusives")
            await shopPage.selectHighestPriceProduct("Our top-selling exclusives")
            myBagCount=myBagCount+1
            await expect(headerPage.checkMyBagCount(myBagCount)).toBe(true)

            await browserHandling.switchToTabIndex(0)
            await legoBrowser.refresh()
            await headerPage.selectOnMyBag(myBagCount)
            debugger
            await myBagPage.printAllProductDetailsOnMyBag(myBagCount)
            await myBagPage.printTotalPrice()
        }else if(isJustThisMonth){
            await shopPage.selectNextProduct("Just in this month")
            await shopPage.selectHighestPriceProduct("Just in this month")
            myBagCount=myBagCount+1
            await expect(headerPage.checkMyBagCount(myBagCount)).toBe(true)

            await browserHandling.switchToTabIndex(0)
            await legoBrowser.refresh()
            await headerPage.selectOnMyBag(myBagCount)
            debugger
            await myBagPage.printAllProductDetailsOnMyBag(myBagCount)
            await myBagPage.printTotalPrice()
        }

        await headerPage.selectAccount()
        await headerPage.selectLogout()
        await headerPage.selectAccount()
        await headerPage.isUserLogout()
        debugger
        await browser.sleep(5000)
    })
})