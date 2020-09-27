import navigation from '../page_objects/navigation'
import {authenticationText, authenticationElements} from '../page_objects/authentication_page'

describe('Authentication screen', () => {
    it('Verify the content of the authentication page', () => {
        browser.url('/');
        navigation.signin();
        authenticationText.forEach(e => {
            expect($(e.element).getText()).toEqual(e.content);
        })
        authenticationElements.forEach(e => {
            expect($(e).isExisting()).toEqual(true);
        })
    })

    it('Verify if the user is able to access to authentication screen', () => {
        browser.url('/');
        navigation.signin();
        expect(browser.getTitle()).toEqual('Login - My Store');
    })

    it('Verify if the email address field is empty by default', () => {
        browser.url('/');
        navigation.signin();
        expect($('#email_create').getValue()).toEqual('');
    })

    it('Verify the functionality of the breadcrumb', () => {
        browser.url('/');
        navigation.signin();
        $('.home').click();
        expect(browser.getTitle()).toEqual('My Store');
    })
})
