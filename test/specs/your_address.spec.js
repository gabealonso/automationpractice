import utilities from '../../utilities'
import navigation from '../page_objects/navigation'
import {authentication} from '../page_objects/authentication_page'
import {addressText, addressElements} from '../page_objects/address_page'
import {completeRegister} from '../page_objects/register_page'

function registerEmail () {
    navigation.signin();
    authentication.signUp(utilities.createEmail());
}

describe('Your address section', () => {
    it('Verify the content of your address area', () => {
        browser.url('/');
        registerEmail();
        addressText.forEach(e => {
            expect($(e.element).getText()).toEqual(e.content);
        })
        addressElements.forEach(e => {
            expect($(e).isExisting()).toEqual(true);
        })
    })

    it('Verify First Name field is completed by default with data entered on Personal information area', () => {
        browser.url('/');
        registerEmail();
        $('#customer_firstname').setValue('firstname');
        expect($('#firstname').getValue()).toEqual('firstname');
    })

    it('Verify First Name field length validation on Your Address area', () => {
        browser.url('/');
        registerEmail();
        $('#firstname').setValue('a'.repeat(33));
        $('#submitAccount').click();
        expect($('#center_column div ol li:nth-child(3)').getText()).toEqual('firstname is too long. Maximum length: 32');
    })

    it('Verify First Name field cannot start with a number on your address area', () => {
        browser.url('/');
        registerEmail();
        $('#firstname').setValue('1first');
        $('#submitAccount').click();
        expect($('#center_column div ol li:nth-child(3)').getText()).toEqual('firstname is invalid.');
    })

    it('Verify First Name field is required on your address area', () => {
        browser.url('/');
        registerEmail();
        $('#customer_firstname').setValue('firstname');
        $('#firstname').setValue('');
        $('#submitAccount').click();
        expect($('#center_column div ol li:nth-child(4)').getText()).toEqual('firstname is required.');
    })

    it('Verify Last Name field is completed by default with data entered on Personal information area', () => {
        browser.url('/');
        registerEmail();
        $('#customer_lastname').setValue('lastname');
        expect($('#lastname').getValue()).toEqual('lastname');
    })

    it('Verify Last Name field length validation on Your Address area', () => {
        browser.url('/');
        registerEmail();
        $('#customer_lastname').setValue('a'.repeat(33));
        $('#submitAccount').click();
        expect($('#center_column div ol li:nth-child(2)').getText()).toEqual('lastname is too long. Maximum length: 32');
    })

    it('Verify Last Name field cannot start with a number on your address area', () => {
        browser.url('/');
        registerEmail();
        $('#customer_lastname').setValue('1lastname');
        $('#submitAccount').click();
        expect($('#center_column div ol li:nth-child(2)').getText()).toEqual('lastname is invalid.');
    })

    it('Verify Last Name field is required on your address area', () => {
        browser.url('/');
        registerEmail();
        $('#customer_lastname').setValue('lastname');
        $('#customer_lastname').setValue('');
        $('#submitAccount').click();
        expect($('#center_column div ol li:nth-child(2)').getText()).toEqual('lastname is required.');
    })

    it('Verify Company field is not allow to enter more than 64 characters', () => {
        browser.url('/');
        registerEmail();
        $('#company').setValue('a'.repeat(65));
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('company is too long. Maximum length: 64');
    })

    it('Verify address field is required', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('firstname', 'lastname', '123456', '', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('address1 is required.');
    })

    it('Verify Address field is not allow to enter more than 128 characters', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('firstname', 'lastname', '123456', 'a'.repeat(129), 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('address1 is too long. Maximum length: 128');
    })

    it('Verify City field is required', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', '', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('city is required.');
    })

    it('Verify City field is not allow to enter more than 64 characters', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', 'a'.repeat(65), 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('city is too long. Maximum length: 64');
    })

    it('Verify State field is a drop down completed with all states from US', () => {
        browser.url('/');
        registerEmail();
        $('#submitAccount').click(); // it is necessary because the dropdown doesn't get the text values
        expect($('#id_state').getText().replace(/\s/g,', ')).toEqual('-, Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware, District, of, Columbia, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New, Hampshire, New, Jersey, New, Mexico, New, York, North, Carolina, North, Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Puerto, Rico, Rhode, Island, South, Carolina, South, Dakota, Tennessee, Texas, US, Virgin, Islands, Utah, Vermont, Virginia, Washington, West, Virginia, Wisconsin, Wyoming');
    })

    it('Verify the State/Zip Code fields are not displayed if the Country = "-"', () => {
        browser.url('/');
        registerEmail();
        $('#id_country').selectByVisibleText('-');
        expect($('#id_state').isDisplayed()).toEqual(false);
        expect($('#postcode').isDisplayed()).toEqual(false);
    })

    it('Verify State field is required', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', 'Los Angeles', '-', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('This country requires you to choose a State.');
    })

    it('Verify Zip/Postal Code is required', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual("The Zip/Postal code you've entered is invalid. It must follow this format: 00000");
    })

    it('Verify Zip/Postal Code is not allow to enter characters', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', 'test', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual("The Zip/Postal code you've entered is invalid. It must follow this format: 00000");
    })

    it('Verify Zip/Postal Code is not allow to enter less than 5 numbers', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '1234', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual("The Zip/Postal code you've entered is invalid. It must follow this format: 00000");
    })

    it('Verify Zip/Postal Code is not allow to enter more than 5 numbers', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '123456', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual("The Zip/Postal code you've entered is invalid. It must follow this format: 00000"); 
    })

    it('Verify Country field is required', () => {
        browser.url('/');
        registerEmail();
        $('#id_country').selectByVisibleText('-');
        $('#submitAccount').click();
        expect($('#center_column div ol li:nth-child(9)').getText()).toEqual("Country is invalid");
    })

    it('Verify Country field is a drop down that includes US', () => {
        browser.url('/');
        registerEmail();
        expect($('#id_country').getText().replace(/\s/g,'')).toEqual('-UnitedStates');
    })

    it('Verify when "-" is selected in Country field the validation message appears', () => {
        browser.url('/');
        registerEmail();
        $('#id_country').selectByVisibleText('-');
        $('#submitAccount').click();
        expect($('#center_column div ol li:nth-child(8)').getText()).toEqual("Country cannot be loaded with address->id_country");
    })

    it('Verify Additional Information allows to enter 300 characters', () => {
        browser.url('/');
        registerEmail();
        $('#other').setValue('a'.repeat(300));
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect(browser.getTitle()).toEqual('My account - My Store');
        navigation.logout();
    })

    it('Verify Additional Information is not allow to enter more than 300 characters', () => {
        browser.url('/');
        registerEmail();
        $('#other').setValue('a'.repeat(301));
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('other is too long. Maximum length: 300');
    })

    it('Verify Mobile phone field is required', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', ''); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('You must register at least one phone number.');
    })

    it('Verify Mobile phone field is a numeric field', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect(browser.getTitle()).toEqual('My account - My Store');
        navigation.logout();
    })

    it('Verify Mobile phone is not allow to enter characters', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', 'test@#%$'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('phone_mobile is invalid.');
    })

    it('Verify Home phone field is a numeric field', () => {
        browser.url('/');
        registerEmail();
        $('#phone').setValue('123456');
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect(browser.getTitle()).toEqual('My account - My Store');
        navigation.logout();
    })

    it('Verify Home phone is not allow to enter characters', () => {
        browser.url('/');
        registerEmail();
        $('#phone').setValue('test@#%$');
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('phone is invalid.');
    })

    it('Verify that the assign an address alias for future reference field is required', () => {
        browser.url('/');
        registerEmail();
        $('#alias').setValue('');
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect($('.alert ol li').getText()).toEqual('alias is required.');
    })

    it('Verify that the assign an address alias for future reference field is completed by default with My address', () => {
        browser.url('/');
        registerEmail();
        expect($('#alias').getValue()).toEqual('My address');
    })

    it('Verify behavior of Register button', () => {
        browser.url('/');
        registerEmail();
        completeRegister.register('firstname', 'lastname', '123456', 'Street 123', 'Los Angeles', 'California', '00000', '123456'); // fname, lname, psswd, addrs, city, state, pstcode, phone
        expect(browser.getTitle()).toEqual('My account - My Store');
        navigation.logout();
    })
})