import utilities from '../../utilities'
import navigation from '../page_objects/navigation'
import {authentication} from '../page_objects/authentication_page'
import {personalinfoText, personalinfoElements, completeRegister, days, months, years} from '../page_objects/register_page'

function registerEmail () {
    navigation.signin();
    authentication.signUp(utilities.createEmail());
}

describe('Your personal information area', () => {
    xit('Verify the content of your personal information area', () => {
        browser.url('/');
        registerEmail();
        personalinfoText.forEach(e => {
            expect($(e.element).getText()).toEqual(e.content);
        })
        personalinfoElements.forEach(e => {
            expect($(e).isExisting()).toEqual(true);
        })
    })

    xit('Verify behavior of radio buttons', () => {
        browser.url('/');
        registerEmail();
        $('#id_gender1').click();
        expect($('#id_gender1').isSelected()).toEqual(true);
        expect($('#id_gender2').isSelected()).toEqual(false);
        $('#id_gender2').click();
        expect($('#id_gender1').isSelected()).toEqual(false);
        expect($('#id_gender2').isSelected()).toEqual(true);
    })

    xit('Verify first name field is required', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('firstname is required.');
    })

    xit('Verify first name field lenght', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('n'.repeat(33), 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('firstname is too long. Maximum length: 32');
    })
    
    xit('Verify first name field cannot start with a number', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('5fname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('firstname is invalid.');
    })

    xit('Verify last name field is required', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('fname', '', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('lastname is required.');
    })

    xit('Verify last name field length', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('fname', 'n'.repeat(33), '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('lastname is too long. Maximum length: 32');
    })

    xit('Verify last name field cannot start with a number', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('fname', '5lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('lastname is invalid.');
    })

    xit('Verify email field is required', () => {
        browser.url('/');
        registerEmail();
        $('#submitAccount').click(); // if we don't click oon submit before, the next line doesn't execute (fix it)
        $('#email').setValue('');
        completeRegister.register('fname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('email is required.');
    })

    xit('Verify email field is completed by default with data entered on previous screen', () => {
        browser.url('/');
        navigation.signin();
        var email = utilities.createEmail()
        authentication.signUp(email);
        $('#submitAccount').click(); // if we don't click on submit before, the next line doesn't execute. the html values doesn't updates (fix it)
        expect($('#email').getValue()).toEqual(email);
    })

    xit('Verify that in the email field it is not allowed to complete with an existing email', () => {
        browser.url('/');
        registerEmail();
        $('#submitAccount').click(); /// if we don't click on submit before, the next line doesn't execute. the html values doesn't updates (fix it)
        $('#email').setValue('automationtest@automation.com');
        completeRegister.register('fname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('An account using this email address has already been registered.');
    })

    xit('Verify correct validation of email field', () => {
        browser.url('/');
        registerEmail();
        $('#submitAccount').click(); // if we don't click on submit before, the next line doesn't execute. the html values doesn't updates (fix it)
        $('#email').setValue('test@');
        completeRegister.register('fname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('email is invalid.');
    })

    xit('Verify password field is required', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('fname', 'lastname', '', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('passwd is required.');
    })

    xit('Verify password field legend', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('fname', 'lastname', '1'.repeat(33), 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('passwd is too long. Maximum length: 32');
    })

    xit('Verify password field length cannot be less than 5 characters', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('fname', 'lastname', '1234', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('passwd is invalid.');
    })

    xit('Verify values of date of birth day dropdown', () => {
        browser.url('/');
        registerEmail();
        for (let i=0; i<32; i++){
            $('#days').selectByIndex(i);
            expect($('#days').getValue()).toEqual(days[i]);    
        }
    })

    xit('Verify values of date of birth month dropdown', () => {
        browser.url('/');
        registerEmail();
        expect($('#months').getText().replace(/\s+/g,', ')).toEqual(months);
    })

    xit('Verify values of date of birth year dropdown', () => {
        browser.url('/');
        registerEmail();
        expect($('#years').getText().replace(/\s+/g,', ')).toEqual(years);
    })

    xit('Verify validation of date of birth day dropdown', () => {
        browser.url('/');
        registerEmail();
        $('#months').selectByIndex(9);
        $('#years').selectByIndex(9);
        completeRegister.register('fname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('Invalid date of birth');
    })

    xit('Verify validation of date of birth month dropdown', () => {
        browser.url('/');
        registerEmail();
        $('#days').selectByIndex(9);
        $('#years').selectByIndex(9);
        completeRegister.register('fname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('Invalid date of birth');
    })

    xit('Verify validation of date of birth year dropdown', () => {
        browser.url('/');
        registerEmail();
        $('#months').selectByIndex(9);
        $('#days').selectByIndex(16);
        completeRegister.register('fname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('Invalid date of birth');
    })

    it('Verify behavior of Sign up for our newsletter checkbox', () => {
        browser.url('/');
        registerEmail();
        $('#newsletter').click();
        expect($('#newsletter').isSelected()).toEqual(true);
    })

    it('Verify behavior of Receive special offers from our partners checkbox', () => {
        browser.url('/');
        registerEmail();
        $('#optin').click();
        expect($('#optin').isSelected()).toEqual(true);
    })

})