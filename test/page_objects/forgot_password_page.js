class forgotpass {
    get emailField () {return $('#email')}
    get retrieve () {return $('.submit button')}

    retrievePassword(email) {
        this.emailField.setValue(email);
        this.retrieve.click();
    }
}

export const forgot = new forgotpass();

export const forgotpassText = [
    {
        element: '.page-subheading',
        content: 'FORGOT YOUR PASSWORD?'
    },

    {
        element: '.box p',
        content: 'Please enter the email address you used to register. We will then send you a new password.'
    }
];

export const forgotpassElements = ['#email', '.submit button', '#center_column ul li a'];
