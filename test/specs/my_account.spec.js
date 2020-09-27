import navigation from '../page_objects/navigation'
import {authentication} from '../page_objects/authentication_page'
import {myaccountText, myaccountElements} from '../page_objects/myaccount_page'

describe('My account screen', () => {
    it('Verify the content of "My Account" screen', () => {
        browser.url('/');
        navigation.signin();
        authentication.login('automationtest@automation.com', 'automation');
        myaccountText.forEach(e => {
            expect($(e.element).getText()).toEqual(e.content);
        })
        myaccountElements.forEach(e => {
            expect($(e).isExisting()).toEqual(true);
        })
    })
})