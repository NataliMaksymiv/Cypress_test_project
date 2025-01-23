class SidePannel{
    get garagePageButton(){
        return cy.get('.col-3 .sidebar').find('[href="/panel/garage"]');
    }
    get fuelExpenseButton(){
        return cy.get('.col-3 .sidebar').find('[href="/panel/expenses"]');
    }
    get InstructionsButton(){
        return cy.get('.col-3 .sidebar').find('[href="/panel/instructions"]');
    }
    get profileButton(){
        return cy.get('.sidebar').contains('.sidebar_btn-group', 'Profile');
    }
    get settingsButton(){
        return cy.get('.col-3 .sidebar').find('[href="/panel/settings"]');
    }

    clickProfileButton(){
        this.profileButton.click();
    }
    
}
export default new SidePannel();