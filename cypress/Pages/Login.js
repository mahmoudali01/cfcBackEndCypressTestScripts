export class Login {
    navigateLoginPage(){
        cy.visit('/auth/login?LOGIN=LOGIN')
        return this
    }
    loginBTN() {
         cy.get(':nth-child(2) > .row > .text-center > .btn').click()
         return this
    }
    usernameRequired(){
       return cy.get(':nth-child(1) > .d-flex > .invalid-feedback > div')
    }
    passwordRequired(){
        return cy.get(':nth-child(2) > .d-flex > .invalid-feedback > div')
    }
    Login(username, password) {
        cy.get(':nth-child(1) > .d-flex > .form-control').clear();
        cy.get(':nth-child(1) > .d-flex > .form-control').type(username);
        cy.get(':nth-child(2) > .d-flex > .form-control').clear();
        cy.get(':nth-child(2) > .d-flex > .form-control').type(password);
        //cy.get(':nth-child(2) > .row > .text-center > .btn').click()
        this.loginBTN()
        return this
    }
   
}