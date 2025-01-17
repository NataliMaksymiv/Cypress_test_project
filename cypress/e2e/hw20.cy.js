import HomePage from "../page-objects/pages/HomePage";
import SignInForm from "../page-objects/forms/SignInForm";
import GaragePage from "../page-objects/pages/GaragePage";
import FuelExpensesPage from "../page-objects/pages/FuelExpensesPage";
import AddAnExpenseForm from "../page-objects/forms/AddAnExpenseForm";
import SidePannel from  "../page-objects/pages/SidePannel";

describe('Adding car on Garage page', () => {

  beforeEach(() => {
    HomePage.open('/');
    SignInForm.signInAction();
    GaragePage.clickAddCarButton();
  });

  describe('Successful car adding', () => {
    it('should add a car with valid brand and model', () => {
      GaragePage.selectBrand('Ford');
      GaragePage.selectModel('Focus');
      GaragePage.enterMileage('15000');
      GaragePage.clickSaveButton();
      GaragePage.verifyCarAdded('Ford', 'Focus');
    });
  });

  describe('Negative Test Cases', () => {

    it('should disable Add button when mileage is negative', () => {
      GaragePage.selectBrand('Porsche');
      GaragePage.selectModel('911');
      GaragePage.enterMileage('-500');
      GaragePage.saveCarButton.should('be.disabled');
      GaragePage.checkErrorMessage('Mileage has to be from 0 to 999999');
    });



    
    it('should disable Add button when mileage exceed max value', () => {
      GaragePage.selectBrand('BMW');
      GaragePage.selectModel('X5');
      GaragePage.enterMileage('1000000');
      GaragePage.saveCarButton.should('be.disabled');
      GaragePage.checkErrorMessage('Mileage has to be from 0 to 999999');
    });

    it('should disable Add button when mileage is empty', () => {
      GaragePage.selectBrand('Audi');
      GaragePage.selectModel('TT');
      GaragePage.carMileageField.focus();
      GaragePage.carMileageField.blur();
      GaragePage.saveCarButton.should('be.disabled');
      GaragePage.checkErrorMessage('Mileage cost required')

      it('should disable Add button when mileage is 0', () => {
        GaragePage.selectBrand('Fiat');
        GaragePage.selectModel('Punto');
        GaragePage.carMileageField.focus();
        GaragePage.carMileageField.blur();
        GaragePage.saveCarButton.should('be.enabled');
        GaragePage.errorMessage.should('not.exist');

      });
    });
  });
});

describe('Successful adding fuel expense', () => {
  beforeEach(() => {
    HomePage.open('/');
    SignInForm.signInAction('naty.maksymiv@gmail.com', 'N04051985m');
  });

  it('Add fuel expense successfully', () => {
    const date = new Date();
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    GaragePage.createCar('Ford', 'Focus', 502);
    GaragePage.verifyCarAdded('Ford', 'Focus');
    GaragePage.clickAddFuelExpenseButton();
    AddAnExpenseForm.addAnExpense(600, 5, 4000);
    SidePannel.fuelExpenseButton.click();
    FuelExpensesPage.verifyExpenseAdded(formattedDate, 600, 5, 4000)
  });
});
describe('Negative cases for adding an expense form', () => {
  beforeEach(() => {
    HomePage.open("/");
    SignInForm.signInAction('naty.maksymiv@gmail.com', 'N04051985m');
  });

  describe('Adding mileage on Add fuel expense', () => {
    it('Verify mileage for negative value', () => {
      GaragePage.createCar('Audi', 'TT', 111);
      GaragePage.clickAddFuelExpenseButton();
      AddAnExpenseForm.fillMileageField('-100')
      AddAnExpenseForm.checkForErrorMessage('Mileage has to be from 0 to 999999')
    });
    it('Verify mileage for max value', () => {
      GaragePage.createCar('Audi', 'TT', 111);
      GaragePage.clickAddFuelExpenseButton();
      AddAnExpenseForm.fillMileageField('1000000')
      AddAnExpenseForm.checkForErrorMessage('Mileage has to be from 0 to 999999')
    });
    it('Verify mileage for blank value', () => {
      GaragePage.createCar('Audi', 'TT', 111);
      GaragePage.clickAddFuelExpenseButton();
      AddAnExpenseForm.fillMileageField(' ')
      AddAnExpenseForm.checkForErrorMessage('Mileage required')
    });
  })
  describe('Adding number of liters on Add fuel expense', () => {

    it('Verify number of liters for negative value', () => {
      GaragePage.createCar('Audi', 'TT', 111);
      GaragePage.clickAddFuelExpenseButton();
      AddAnExpenseForm.fillNumberOfLitersField('-100')
      AddAnExpenseForm.checkForErrorMessage('Liters has to be from 0.01 to 9999')
    });
    it('Verify number of liters for max value', () => {
      GaragePage.createCar('Audi', 'TT', 111);
      GaragePage.clickAddFuelExpenseButton();
      AddAnExpenseForm.fillNumberOfLitersField('10000')
      AddAnExpenseForm.checkForErrorMessage('Liters has to be from 0.01 to 9999')
    });
    it('Verify number of liters for blank value', () => {
      GaragePage.createCar('Audi', 'TT', 111);
      GaragePage.clickAddFuelExpenseButton();
      AddAnExpenseForm.fillNumberOfLitersField(' ')
      AddAnExpenseForm.checkForErrorMessage('Liters required')
    });
  });
  describe('Adding total cost on Add fuel expense', () => {
    it('Verify total cost field for zero value', () => {
      GaragePage.createCar('Audi', 'TT', 111);
      GaragePage.clickAddFuelExpenseButton();
      AddAnExpenseForm.filltotalCost('0')
      AddAnExpenseForm.checkForErrorMessage('Total cost has to be from 0.01 to 1000000');
    });
    it('Verify total cost field for negative value', () => {
      GaragePage.createCar('Audi', 'TT', 111);
      GaragePage.clickAddFuelExpenseButton();
      AddAnExpenseForm.filltotalCost('-100')
      AddAnExpenseForm.checkForErrorMessage('Total cost has to be from 0.01 to 1000000')
    });
    it('Verify total cost field for max value', () => {
      GaragePage.createCar('Audi', 'TT', 111);
      GaragePage.clickAddFuelExpenseButton();
      AddAnExpenseForm.filltotalCost('10000001')
      AddAnExpenseForm.checkForErrorMessage('Total cost has to be from 0.01 to 1000000')
    });
    it('Verify total cost field for blank value', () => {
      GaragePage.createCar('Audi', 'TT', 111);
      GaragePage.clickAddFuelExpenseButton();
      AddAnExpenseForm.filltotalCost(' ')
      AddAnExpenseForm.checkForErrorMessage('Total cost required')
    });
  });
});

