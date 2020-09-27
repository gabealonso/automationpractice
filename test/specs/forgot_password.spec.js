import utilities from '../../utilities'
import navigation from '../page_objects/navigation'
import {forgot, forgotpassText, forgotpassElements} from '../page_objects/forgot_password_page'

describe('Forgot password?', () => {
    it('Veriy the content of Forgot your password? screen', () => {
        browser.url('/');
        navigation.signin();
        $('.lost_password a').click();
        forgotpassText.forEach(e => {
            expect($(e.element).getText()).toEqual(e.content);
        })
        forgotpassElements.forEach(e => {
            expect($(e).isExisting()).toEqual(true);
        })
    })

    it('Verify the validation message when the client enters an invalid email address', () => {
        browser.url('/');
        navigation.signin();
        $('.lost_password a').click();
        forgot.retrievePassword('test');
        expect($('.alert ol li').getText()).toEqual('Invalid email address.');

    })

    it('Verify the validation message when the client enters an unexisting email address', () => {
        browser.url('/');
        navigation.signin();
        $('.lost_password a').click();
        forgot.retrievePassword(utilities.createEmail());
        expect($('.alert ol li').getText()).toEqual('There is no account registered for this email address.');        
    })

    it('Verify behavior for Retrieve Password button', () => {
        browser.url('/');
        navigation.signin();
        $('.lost_password a').click();
        forgot.retrievePassword('test@test.com');
        expect($('.alert').getText()).toEqual('A confirmation email has been sent to your address: test@test.com');
    })
})