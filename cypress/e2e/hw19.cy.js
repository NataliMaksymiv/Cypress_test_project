//import { faker } from '@faker-js/faker';

describe('Registration Form Tests', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.contains('.hero-descriptor_btn', 'Sign up').click();
    });
    describe('Field "Name"', () => {

        it('should accept a valid name', () => {
            cy.get('#signupName').type('John');
            cy.get('#signupName').blur();
            cy.get('.form-group .invalid-feedback').should('not.exist');
            cy.get('#signupName').should('not.have.css', 'border', 'rgb(220, 53, 69)');
        });

        it('should show an error for empty "Name" field', () => {
            cy.get('#signupName').click().blur();
            cy.get('.form-group .invalid-feedback').should('contain', 'Name required');
            cy.get('.form-control.is-invalid').should('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('should show an error for invalid "Name" field', () => {
            cy.get('#signupName').type('123@!').blur(); // Invalid input 
            cy.get('.form-group .invalid-feedback').should('contain', 'Name is invalid');
        });

        it('should show an error for "Name" field length outside 2-20 characters', () => {
            cy.get('#signupName').type('A').blur();
            cy.get('.form-group').eq(1).get('.invalid-feedback').should('contain', 'Name has to be from 2 to 20 characters long');

            cy.get('#signupName').clear().type('A'.repeat(21)); // Over 20 characters
            cy.get('#signupName').blur();
            cy.get('.form-group').eq(1).get('.invalid-feedback').should('contain', 'Name has to be from 2 to 20 characters long');
        });
        it('should trim spaces and accept valid names', () => {
            cy.get('#signupName')
                .type('   John   ') // Input with leading and trailing spaces
                .blur();
            cy.get('#signupName').then(($input) => {
                const trimmedValue = $input.val().trim(); // Trim the value
                expect(trimmedValue).to.equal('John');
            });
            cy.get('#signupName').should('not.have.css', 'border-color', 'red');
        });
    });

    describe('Field "Last name"', () => {
        it('should accept a valid last name', () => {
            cy.get('#signupLastName').type('Smith');
            cy.get('#signupLastName').blur();
            cy.get('.form-group').eq(2).get('.invalid-feedback').should('not.exist');
            cy.get('#signupLastName').should('not.have.css', 'border', 'rgb(220, 53, 69)');
        });
        it('should show an error for empty "Last name" field', () => {
            cy.get('#signupLastName').focus().blur();
            cy.get('.form-group').eq(2).get('.invalid-feedback').should('contain', 'Last name required');
            cy.get('.form-control.is-invalid')
                .should('be.visible')
                .and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });

        it('should show an error for invalid "Last name" field', () => {
            cy.get('#signupLastName').type('123@!').blur(); // Invalid input 
            cy.get('.form-group').eq(2).get('.invalid-feedback').should('contain', 'Last name is invalid');
        });

        it('should show an error for "Last name" field length outside 2-20 characters', () => {
            cy.get('#signupLastName').type('A').blur();
            cy.get('.form-group').eq(2).get('.invalid-feedback').should('contain', 'Last name has to be from 2 to 20 characters long');

            cy.get('#signupLastName').clear().type('A'.repeat(21)); // Over 20 characters
            cy.get('.modal-body').click();
            cy.get('.form-group').eq(2).get('.invalid-feedback').should('contain', 'Last name has to be from 2 to 20 characters long');
        });
    });

    describe('Field "Email"', () => {
        it('should accept a valid email', () => {
            cy.get('#signupEmail').type('test@example.com');
            cy.get('#signupEmail').blur();
            cy.get('.form-group .invalid-feedback').should('not.exist');
            cy.get('#signupEmail').should('not.have.css', 'border', 'rgb(220, 53, 69)');
        });
        it('should validate "Email" field', () => {
            cy.get('#signupEmail').type('invalid-email').blur();
            cy.get('.form-group .invalid-feedback').should('contain', 'Email is incorrect');
            cy.get('#signupEmail').clear().blur();
            cy.get('.form-group').eq(3).get('.invalid-feedback').should('contain', 'Email required');
        });
    });

    describe('Field "Password"', () => {
        it('should accept a valid password', () => {
            cy.get('#signupPassword').type('StrongP@ss1');
            cy.get('#signupPassword').blur();
            cy.get('.ng-invalid').eq(4).get('.invalid-feedback').should('not.exist')
            cy.get('#signupPassword').should('not.have.css', 'border-color', 'rgb(220, 53, 69)');
        });
        it('should validate "Password" field requirements', () => {
            cy.get('#signupPassword').type('short');
            cy.get('#signupPassword').blur();
            cy.get('.ng-invalid').eq(4).get('.invalid-feedback').should('contain', 'Password has to be from 8 to 15 characters long');
            cy.get('#signupPassword').clear().type('password').blur();
            cy.get('.form-group')
                .eq(4)
                .get('.invalid-feedback')
                .should('have.text', 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
                .and('have.css', 'border-color', 'rgb(220, 53, 69)');
        });
    });

    describe('Field "Re-enter password"', () => {
        it('should validate "Re-enter password" field', () => {
            cy.get('#signupPassword').type('Password123');
            cy.get('#signupRepeatPassword').type('Password456')
            cy.get('#signupRepeatPassword').blur();;
            cy.get('#signupRepeatPassword').get('.invalid-feedback').should('have.text', 'Passwords do not match');

            cy.get('#signupRepeatPassword').clear().blur();
            cy.get('#signupRepeatPassword').get('.invalid-feedback').should('contain', 'Re-enter password required');
        });
    });

    describe('"Register" button', () => {
        it('should disable the "Register" button if any field is invalid', () => {
            cy.get('#signupName').type('John');
            cy.get('#signupLastName').type('Doe');
            cy.get('#signupEmail').type('john.doe@example.com');
            cy.get('#signupPassword').type('Password123');
            cy.get('#signupRepeatPassword').type('Password456').blur();
            cy.get('#signupRepeatPassword')
                .get('.invalid-feedback')
                .should('contain', 'Passwords do not match')
                .and('have.css', 'border-color', 'rgb(220, 53, 69)');
            cy.contains('button', 'Register').should('be.disabled');
        });
    });
    describe('Successful registration', () => {
        const email = `naty.maksymiv+${Math.floor(Math.random() * 10000)}@gmail.com`; 

        it('should create a new user when all fields are valid', () => {
            cy.get('#signupName').type('Nata');
            cy.get('#signupLastName').type('Maksy');
            cy.get('#signupEmail').type(email);
            cy.get('#signupPassword').type('Mypass2024');
            cy.get('#signupRepeatPassword').type('Mypass2024');
            cy.contains('button', 'Register').click();
            cy.url().should('include', '/panel/garage');
        });
    });
});