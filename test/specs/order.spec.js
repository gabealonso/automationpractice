import navigation from '../page_objects/navigation'
import {authentication} from '../page_objects/authentication_page'
import {orderText, orderElements, orderColumns} from '../page_objects/order_page'

function orderPage() {
    navigation.signin();
    authentication.login('automationtest@automation.com', 'automation');
    $('#center_column div div:nth-child(1) ul li:nth-child(1) a').click();
}

describe('Order', () => {
    it('Verify the client is able to access Order History page', () => {
        browser.url('/');
        orderPage();
        expect(browser.getTitle()).toEqual('Order history - My Store');
        navigation.logout();
    })

    it('Verify Order History page displays the correct information', () => {
        browser.url('/');
        orderPage();
        orderText.forEach(e => {
            expect($(e.element).getText()).toEqual(e.content);
        })
        orderElements.forEach(e => {
            expect($(e).isExisting()).toEqual(true);
        })
        navigation.logout();
    })

    it('Verify for each order the correct information is displayed', () => {
        browser.url('/');
        browser.setWindowSize(2000, 800);
        orderPage();
        orderColumns.forEach(e => {
            expect($(e.element).getText()).toEqual(e.content);
        })
    })

    it('Verify the client is able to download the invoice', () => {
        browser.url('/');
        browser.setWindowSize(2000, 800);
        orderPage();
        expect($('#order-list tbody tr.first_item td.history_invoice a').isClickable()).toEqual(true);
        navigation.logout();
    })

    it('Verify behavior of Details button', () => {
        browser.url('/');
        browser.setWindowSize(2000, 800);
        orderPage();
        $('#order-list tbody tr.first_item td.history_detail.footable-last-column a.btn.btn-default.button.button-small').click();
        expect($('#sendOrderMessage div button').getText()).toEqual('Send');
        expect($('#sendOrderMessage div button').isExisting()).toEqual(true);
        navigation.logout();
    })

    it('Verify behavior for reorder button', () => {
        browser.url('/');
        browser.setWindowSize(2000, 800);
        orderPage();
        $('#order-list tbody tr.first_item td.history_detail.footable-last-column a.link-button').click();
        expect(browser.getTitle()).toEqual('Order - My Store');
        navigation.logout();
    })
})