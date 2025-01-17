//import BasePage from "./BasePage";

class HomePage {
    get signInButton() {
        return cy.get('.header_signin');
    }

    clickSignInButton(){
    this.signInButton.click();
    }
    open(url) {
        cy.visit(url);
    }

}
export default new HomePage();