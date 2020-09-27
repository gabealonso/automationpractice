import utilities from '../../utilities'
import navigation from '../page_objects/navigation'
import {authentication} from '../page_objects/authentication_page'

describe('Register', () => {
    it('Verify validation for invalid email format', () => {
        browser.url('/');
        navigation.signin();
        authentication.signUp('test');
        expect($('.alert ol li').getText()).toEqual('Invalid email address.');
    })

    it('Verify validation fo existing email', () => {
        browser.url('/');
        navigation.signin();
        authentication.signUp('automationtest@automation.com');
        expect($('.alert ol li').getText()).toEqual('An account using this email address has already been registered. Please enter a valid password or request a new one.');
    })

    it('Verify unexisting email address', () => {
        browser.url('/');
        navigation.signin();
        authentication.signUp(utilities.createEmail());
        expect($('#account-creation_form div:nth-child(1) h3').getText()).toEqual('YOUR PERSONAL INFORMATION');
    })
})