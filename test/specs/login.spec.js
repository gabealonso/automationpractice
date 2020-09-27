import navigation from '../page_objects/navigation'
import {authentication} from '../page_objects/authentication_page'

describe ('Login', () => {
    it('Verify correct Authentication behavior of existing user', () => {
        browser.url('/');
        navigation.signin();
        authentication.login('automationtest@automation.com', 'automation');
        expect(browser.getTitle()).toEqual('My account - My Store');
        navigation.logout();
    })

    it('Verify validation for invalid login password', () => {
        browser.url('/');
        navigation.signin();
        authentication.login('automationtest@automation.com', '123456'); // valid format at least 6 characters
        expect($('.alert ol li').getText()).toEqual('Authentication failed.');
    })

    it('Verify validation for invalid password format', () => {
        browser.url('/');
        navigation.signin();
        authentication.login('automationtest@automation.com', '123'); // invalid format less than 6 characters
        expect($('.alert ol li').getText()).toEqual('Invalid password.');
    })

    it('Verify validation for invalid email format', () => {
        browser.url('/');
        navigation.signin();
        authentication.login('test@', '123456');
        expect($('.alert ol li').getText()).toEqual('Invalid email address.');
    })

    it('Verify email address field is required', () => {
        browser.url('/');
        navigation.signin();
        authentication.login('', '123456');
        expect($('.alert ol li').getText()).toEqual('An email address required.');
    })

    it('Verify password field is required', () => {
        browser.url('/');
        navigation.signin();
        authentication.login('automationtest@automation.com', '');
        expect($('.alert ol li').getText()).toEqual('Password is required.');
    })
})