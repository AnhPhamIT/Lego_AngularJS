import { ActionSupport } from "../../core_function/actionSupport/actionSupport";
import { ProtractorBrowser, by } from "protractor";
import { PopupHandling } from "../Common/PopupHandling";

export class ProductPage{
    actionSupport: ActionSupport
    curBrowser:ProtractorBrowser
    popupHandling:PopupHandling

    productName_sidebar:string
    addToWishList_sidebar:string
    addToWishList_maincontent:string
    addToMyBag_maincontent:string
    limit_dll:string

    constructor(browse: ProtractorBrowser){
        this.curBrowser= browse
        this.actionSupport= new ActionSupport(this.curBrowser)
        this.popupHandling = new PopupHandling(this.curBrowser)

        this.productName_sidebar="//div[@class='details__sidebar']/descendant::span[@class='product-id__name']"
        this.addToWishList_sidebar="//div[@class='details__sidebar']/descendant::a[contains(text(),'Add to wishlist')]"
        this.limit_dll=" //select[@data-test='product-overview-quantity']/parent::div"
        this.addToWishList_maincontent="//div[@id='main-content']/descendant::button[@data-test='add-to-wishlist']"
        this.addToMyBag_maincontent="//div[@class='ProductOverviewstyles__Section-sc-1a1az6h-0 Fnmud']/descendant::button[@data-test='add-to-bag']"
    }


    async getProductNameOnSideBar(){
        await this.actionSupport.waitForElementDisplayed(this.productName_sidebar)
        return await this.curBrowser.element(by.xpath(this.productName_sidebar)).getText()
    }

    async addToWishList(){
        try {
            await this.actionSupport.clickOnElement(this.addToWishList_sidebar)    
        } catch (error) {
            // await this.actionSupport.clickOnElement(this.popupHandling.advertiseNo)
            await this.popupHandling.dismissAdvertise()
            await this.actionSupport.clickOnElement(this.addToWishList_sidebar)    
        }
        
    }

    async addToWishListMain(){
        try {
            await this.actionSupport.clickOnElement(this.addToWishList_maincontent)
        } catch (error) {
            // await this.actionSupport.clickOnElement(this.popupHandling.advertiseNo)
            await this.popupHandling.dismissAdvertise()
            await this.actionSupport.clickOnElement(this.addToWishList_maincontent)
        }
    }

    async selectProductLimit(limitNo:number){
        // await this.actionSupport.clickOnElement(this.limit_dll)
        try {
            await this.actionSupport.clickOnElement("//select[@data-test='product-overview-quantity']/option[text()='"+limitNo+"']")    
        } catch (error) {
            await this.actionSupport.clickOnElement("//select[@data-test='product-overview-quantity']/option[text()='"+limitNo+"']")
        }
        
    }

    async addToMyBag(){
        await this.actionSupport.clickOnElement(this.addToMyBag_maincontent)
    }
    
}