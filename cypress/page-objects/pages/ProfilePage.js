class ProfilePage {
    get profileName() {
        return cy.get('.panel-page .profile_name')
    }
    
}
export default new ProfilePage();