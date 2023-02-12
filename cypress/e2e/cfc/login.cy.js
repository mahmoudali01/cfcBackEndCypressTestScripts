import {Login} from "../../Pages/Login";
const login = new Login()
beforeEach(()=>{
  login.navigateLoginPage()
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
      login.loginBTN()
      login.usernameRequired().should('have.text','Username is required') 
      login.passwordRequired().should('have.text','Password is required')   
       
    })
    it('login with invalid data', () => {
      login.Login('testInvalid','test')
      cy.Toast().should('have.text','Invalid username or password');   
    })
    it('add space in username field and login', () => {
      login.Login(' ','test')
      cy.Toast().should('have.text','Please fill all mandatory data');   
    })
  it('login with valid data', () => {
    login.Login('MahmoudAliSuperAdmin','Admin@VL')
    cy.get('h2').should('have.text','DashBoard')
  })

 })
