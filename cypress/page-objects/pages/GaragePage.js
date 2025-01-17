class GaragePage {
    get addCarButton() {
        return cy.contains('.btn', 'Add car');
    }

    get carBrandDropdown() {
        return cy.get('#addCarBrand');
    }

    get carModelDropdown() {
        return cy.get('#addCarModel');
    }

    get carMileageField() {
        return cy.get('#addCarMileage');
    }

    get saveCarButton() {
        return cy.get('.modal-content').contains('.btn', 'Add');
    }

    get errorMessage(){
        return cy.get('.invalid-feedback');
    }
    get addfuelExpenseButton(){
        return cy.get('.panel-page_cars').contains('.car_add-expense', 'Add fuel expense');
    }
    get editCarButton(){
        return cy.get('.car-list .car-item').eq('1').get('.car_edit .icon');

    }
    get removeCarButton(){
        cy.wrap(this.editCarButton.click()).contains('.btn', 'Remove car');
    }
    get submitRemoveCarButton(){
        return this.removeCarButton.click()
            .get('.modal-footer').contains('.btn', 'Remove');
    }

    createCar(brand, model, mileage) {
        this.addCarButton.click();
        this.carBrandDropdown.select(brand);
        this.carModelDropdown.select(model);
        this.carMileageField.type(mileage).blur();

        this.saveCarButton.click();
    }
    clickAddCarButton(){
        this.addCarButton.click();
    }
    selectBrand(brand) {
        this.carBrandDropdown.select(brand);
    }

    selectModel(model) {
        this.carModelDropdown.select(model);
    }

    enterMileage(mileage) {
        this.carMileageField.type(mileage).blur();
    }

    clickSaveButton() {
        this.saveCarButton.click();
    }
    checkErrorMessage(expectedMessage) {
        this.errorMessage.should('contain', expectedMessage);
    }

    verifyCarAdded(brand, model) {
        cy.contains(`${brand} ${model}`).should('be.visible');
    }

    clickAddFuelExpenseButton(){
        //GaragePage.createCar('Ford', 'Focus', 101);
        this.addfuelExpenseButton.click();        
    }
    
}

export default new GaragePage();
