class authenticationClass {
    get newEmailfield () {return $('#email_create')}
    get createNewBtn () {return $('#SubmitCreate')}
    get emailField () {return $('#email')}
    get passwordField () {return $('#passwd')}
    get loginBtn () {return $('#SubmitLogin')}

    login(email, password) {
        this.emailField.setValue(email);
        this.passwordField.setValue(password);
        this.loginBtn.click();
    }
    
    signUp(email) {
        this.newEmailfield.setValue(email);
        this.createNewBtn.click();
    }
}

export const authentication = new authenticationClass();

export const authenticationText = [
    {
        element: '.page-heading',
        content: 'AUTHENTICATION'
    },

    {
        element: '.page-subheading',
        content: 'CREATE AN ACCOUNT'
    },

    {
        element: '#login_form > h3',
        content: 'ALREADY REGISTERED?'
    },

    {
        element: '#login_form > div > p.lost_password.form-group > a',
        content: 'Forgot your password?'
    }
];

export const authenticationElements = ['#email_create', '#SubmitCreate', '#email', '#passwd', '#SubmitLogin'];