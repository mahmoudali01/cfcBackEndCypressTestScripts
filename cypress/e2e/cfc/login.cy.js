beforeEach(()=>{
  cy.visit('/auth/login?LOGIN=LOGIN')
})
describe('login page text',()=>{
  it('login logo',()=>{
    cy.get('img').should('be.visible')
  })
  it('page title',()=>{
    cy.get('#title').should('have.text','login') 
   })
  
  it('Username Label',()=>{
    cy.get(':nth-child(1) > .label').should('have.text','Username:') 
   })
   it('Password Label',()=>{
    cy.get(':nth-child(2) > .label').should('have.text','Password:') 
   })
  it('Login button text',()=>{
    cy.get(':nth-child(2) > .row > .text-center > .btn').should('have.text','Login')
  })
  it('SSO button text',()=>{
    cy.get('.row.align-items-center > :nth-child(3) > .btn').should('have.text','Login With SSO')
  })
  
 
})
 describe('login Scenarios', () => {
 
    it('login with no data', () => {
      cy.get(':nth-child(2) > .row > .text-center > .btn').click()
      cy.get(':nth-child(1) > .d-flex > .invalid-feedback > div').should('have.text','Username is required') 
      cy.get(':nth-child(2) > .d-flex > .invalid-feedback > div').should('have.text','Password is required')   
       
    })
    it('login with invalid data', () => {
      cy.get(':nth-child(1) > .d-flex > .form-control').clear();
      cy.get(':nth-child(1) > .d-flex > .form-control').type('testInvalid');
      cy.get(':nth-child(2) > .d-flex > .form-control').clear();
      cy.get(':nth-child(2) > .d-flex > .form-control').type('test');
      cy.get(':nth-child(2) > .row > .text-center > .btn').click()
      
      cy.get('.message').should('have.text','Invalid username or password');


      
    })
  it('login with valid data', () => {
    cy.get(':nth-child(1) > .d-flex > .form-control').clear();
    cy.get(':nth-child(1) > .d-flex > .form-control').type('MahmoudAliSuperAdmin');
    cy.get(':nth-child(2) > .d-flex > .form-control').clear();
    cy.get(':nth-child(2) > .d-flex > .form-control').type('Admin@VL');
    cy.get(':nth-child(2) > .row > .text-center > .btn').click()
    cy.get('h2').should('have.text','DashBoard')
  })

 })
