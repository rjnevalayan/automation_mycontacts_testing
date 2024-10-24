class Page {
    constructor(browser) {
        this.browser = browser;
        this.signupButton = '//div//button[@id="signup"]';
        this.firstNameInput = '//div//input[@id="firstName"]';
        this.lastNameInput = '//div//input[@id="lastName"]';
        this.emailInput = '//div//input[@id="email"]';
        this.passwordInput = '//div//input[@id="password"]';
        this.submitButton = '//div//button[@id="submit"]';
    }

    async navigateToSignup() {
        await this.browser.url('https://thinking-tester-contact-list.herokuapp.com/');
        await $(this.signupButton).waitForExist({ timeout: 3000 });
        console.log('Signup button is visible, clicking...');
        await $(this.signupButton).click();
    }

    async fillSignupForm(firstName, lastName, email, password) {
        await this.browser.url('https://thinking-tester-contact-list.herokuapp.com/addUser');
        await $(this.firstNameInput).setValue(firstName);
        await $(this.lastNameInput).setValue(lastName);
        console.log('Using email:', email);
        await $(this.emailInput).setValue(email);
        await $(this.passwordInput).setValue(password);
    }

    async submitSignupForm() {
        console.log('Submitting the signup form...');
        await $(this.submitButton).click();
    }

    async verifySignup() {
        await this.browser.url('https://thinking-tester-contact-list.herokuapp.com/contactList');
        await this.browser.pause(2000);
    }
}

export default new Page();