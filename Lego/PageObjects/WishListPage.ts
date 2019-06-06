import { ActionSupport } from "../../core_function/actionSupport/actionSupport";
import { ProtractorBrowser, by, Key } from "protractor";

export class WishListPage{
    actionSupport:ActionSupport
    curBrowser:ProtractorBrowser

    delete_lnk:string
    moveToBag:string
    constructor(browser:ProtractorBrowser){
        this.curBrowser= browser
        this.actionSupport = new ActionSupport(this.curBrowser)
        
        this.delete_lnk="//a[text()='Delete']"
        this.moveToBag="//span[text()='Move To Bag']/parent::button"
    }
    getProductName_xpath(productName:string){
        return "//span[text()='"+productName+"']"
    }

    async isProductAddedInWishList(productName:string){
        await this.actionSupport.waitForElementDisplayed(this.getProductName_xpath(productName))
        await this.curBrowser.element(by.xpath(this.getProductName_xpath(productName))).isDisplayed()
    }

    async deleteItemFromWishList(productName:string){
        await this.actionSupport.clickOnElement("//span[text()='"+productName+"']/ancestor::div[2]/descendant::a[text()='Delete']")
    }

    async selectMoveToBagByIndex(productIndex:number){
        let xpath="//div[@class='wishlist-item']["+productIndex+"]/descendant::button[contains(.,'Move To Bag')]"
        this.actionSupport.sendKeysOnElement(xpath, Key.PAGE_UP)
        await this.curBrowser.sleep(5000)
        await this.actionSupport.clickOnElement(xpath)
    }

    async selectSortOrder(sortOrder:string){
        await this.actionSupport.clickOnElement("//select[@data-test='wishlist-sort-select']/option[text()='"+sortOrder+"']")
    }

    async moveProductItemsToBag(itemCount){
        // await this.curBrowser.sleep(1000)
        for (let index = itemCount; index >= 1; index--) {
            await this.selectMoveToBagByIndex(index)  
        }
    }

    async verifySortedWishListProduct(itemCount:number){
        let obtainedList:Array<number>=[]
        let sortedList:Array<number>=[]
        let productPrice=0
        for (let index = 1; index <= itemCount; index++) {
            await this.curBrowser.element(by.xpath("//div[@class='wishlist-item']["+index+"]/descendant::span[@class='product-price__list-price']")).getText().then(function(value){

                productPrice= Number(String(value).split('£')[1])
                console.log("**********************************Price of product " + index + " is: " + productPrice)

                obtainedList.push(productPrice)
                console.log("Print list " + obtainedList)
                sortedList.push(productPrice)
                console.log("before sort " + sortedList)
            })
            
        }

        sortedList.sort()
        console.log("after sort " + sortedList)
        expect(obtainedList).toEqual(sortedList)
    }
}