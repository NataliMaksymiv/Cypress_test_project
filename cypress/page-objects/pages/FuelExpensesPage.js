class FuelExpensesPage {
    get addExpenseButton() {
      return cy.get('button[data-testid="add-expense"]');
    }
  
    get expenseAmountField() {
      return cy.get('input[name="amount"]');
    }
  
    get expenseDateField() {
      return cy.get('input[name="date"]');
    }
  
    get saveExpenseButton() {
      return cy.get('button[data-testid="save-expense"]');
    }

    verifyExpenseAdded(date, miles, liters, costs) {
      cy.get('.col-lg-9 .table').eq(0).find('td').eq(0).should('have.text', date);
      cy.get('.col-lg-9 .table').eq(0).find('td').eq(1).should('have.text', miles);
      cy.get('.col-lg-9 .table').eq(0).find('td').eq(2).should('have.text', `${liters}L`);
      cy.get('.col-lg-9 .table').eq(0).find('td').eq(3).should('have.text', `${costs}.00 USD`);
  }


  
    /*addFuelExpense(amount, date) {
      this.addExpenseButton.click();
      this.expenseAmountField.type(amount);
      this.expenseDateField.type(date);
      this.saveExpenseButton.click();
    }*/
  }
  
  export default new FuelExpensesPage();
  