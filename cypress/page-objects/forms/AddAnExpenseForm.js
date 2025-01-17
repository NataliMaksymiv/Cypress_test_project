class AddAnExpenseForm{

    get vehicleDropDown(){
        return cy.get('#addExpenseCar');
    }
    get reportDateField(){
        return cy.get('#addExpenseDate');
    }
    get mileageField(){
        return cy.get('#addExpenseMileage');
    }
    get numbersOfLitersField(){
        return cy.get('#addExpenseLiters');
    }
    get totalCostField(){
        return cy.get('#addExpenseTotalCost');
    }
    get addExpenceButton(){
        return cy.get('.modal-footer').contains('.btn', 'Add');
    }
    get closeButton(){
        return cy.get('.modal-dialog').contains('.close', '×');
    }

    fillMileageField(mileage){
        this.mileageField.clear().type(mileage).blur();
    }
    fillNumberOfLitersField(liters){
        this.numbersOfLitersField.type(liters).blur();
    }
    filltotalCost(cost){
        this.totalCostField.type(cost).blur();

    }

    checkForErrorMessage(errorMessage){
        cy.get('.form-group .invalid-feedback').contains(errorMessage);
    }

    addAnExpense( miles, liters, costs){
        //this.vehicleDropDown.type(addedCar);
        //this.reportDateField.type(date);
        this.mileageField.clear().type(miles);
        this.numbersOfLitersField.type(liters);
        this.totalCostField.type(costs).blur();
        this.addExpenceButton.click();
        //this.closeButton.click();
    }
}

export default new AddAnExpenseForm();