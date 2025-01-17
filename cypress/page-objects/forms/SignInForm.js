import HomePage from "../pages/HomePage";

class SignInForm{

    get emailField() {

        return cy.get('#signinEmail');

    }

    get passwordField(){

        return cy.get('#signinPassword');

    }

    get loginButton(){

        return cy.get('.modal-footer .btn-primary');

    }

    get wrongCredsErrorMessage(){

        return cy.contains('.alert-danger', 'Wrong email or password');

    }

    verifyFieldErrorByText(text){
        cy.contains('.invalid-feedback p', text)

    }

    triggerEmptyErrorMessageByField(fieldName){ 

        const element = fieldName ==='email' ? this.emailField : this.passwordField;

        element.focus();
        element.blur();
        
        /*if(fieldName ==='email'){
            this.emailField.focus();
            this.emailField.blur();
        }else{
            this.passwordField.focus();
            this.passwordField.blur();
        }*/
    }

    enterEmail(email){
        this.emailField.type(email);
    }

    enterPassword(password){
        this.passwordField.type(password);
    }

    submitForm(){
        this.loginButton.click();
    }
    signInAction() {
        const email = Cypress.config('user').email;
        const password = Cypress.config('user').password;

        HomePage.clickSignInButton();
        this.enterEmail(email);
        this.enterPassword(password);
        this.submitForm();
    }
}

export default new SignInForm();