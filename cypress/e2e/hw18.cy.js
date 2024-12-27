/// <reference types="cypress" />

describe('Header and Footer Buttons and Links Verification', () => {
    beforeEach(() => {
      cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
    });
  
    it('Verify All header buttons', () => {
      cy.get('[appscrollto="aboutSection"]').should('contain', 'About'); 
      cy.get('[appscrollto="contactsSection"]').should('be.visible'); 
      cy.get('.header_right .header-link').should('contain', 'Guest log in'); 
      cy.get('.header_right .btn').not('be.hidden');
    });  
    
    it('Verify Sign up button', () => {  
      cy.contains('.hero-descriptor_btn', 'Sign up').invoke('text').should('eq', 'Sign up'); 
    });
    
    it('Verify social media footer links', () => { 
      cy.get('app-home').children('#contactsSection').find('[href="https://www.facebook.com/Hillel.IT.School"]');
      cy.get('app-home').children('#contactsSection').find('[href="https://t.me/ithillel_kyiv"]');
      cy.get('#contactsSection').children('.container').find('[href="https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"]');
      cy.get('.socials_icon').parent('[href="https://www.instagram.com/hillel_itschool/"]');
      cy.get('.socials_icon').eq(4).parent().invoke('attr', 'href').should('contain', 'https://www.linkedin.com/school/ithillel/'); 
    });
    
    it('Verify links to the main site', () => {   
      cy.get('.col-md-6').find('[href="https://ithillel.ua"]');
      cy.get('.col-md-6').contains('support@ithillel.ua').invoke('attr', 'href').should('eq', 'mailto:developer@ithillel.ua');
    });  
});
  