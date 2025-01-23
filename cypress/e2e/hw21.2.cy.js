import SidePannel from "../page-objects/pages/SidePannel";
import HomePage from "../page-objects/pages/HomePage";
import SignInForm from "../page-objects/forms/SignInForm";
import ProfilePage from "../page-objects/pages/ProfilePage";


describe('Intercept Profile Page', () => {

  beforeEach(() => {
    HomePage.open('/');
    SignInForm.signInAction('naty.maksymiv@gmail.com', 'N04051985m');
  });

  it('Verify profile name before update', () => {

    SidePannel.clickProfileButton();
    ProfilePage.profileName.should('have.text', 'Nata Maksy');
  });

  it('Modify user name to Polar Bear on Profile page', () => {

    const profileData = {
      "status": "ok",
      "data": {
        "userId": 168740,
        "photoFilename": "default-user.png",
        "name": "Polar",
        "lastName": "Bear"
      }
    };
    cy.intercept('GET', '**/users/profile', profileData).as('getProfile');
    SidePannel.clickProfileButton();
    cy.wait('@getProfile').its('response.statusCode').should('eq', 200);
    ProfilePage.profileName.should('have.text', 'Polar Bear');
  });
});

