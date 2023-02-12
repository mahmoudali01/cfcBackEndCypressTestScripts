export class ManageProject {

    navigateManageProjectsPage() {
        cy.get('.sidebar-toggle').click()
        cy.get('a.ng-tns-c111-0 > .menu-title').click()
        cy.get('.menu-item.ng-tns-c111-2').click()
        cy.get('.sidebar-toggle').click()
        return this
    }
    arNameFilterLabel() {
        return cy.get(':nth-child(1) > .form-group > .label')

    }
    proTypeFileterLabel() {
        return cy.get(':nth-child(2) > .form-group > .label')
    }
    erNameFilterLabel() {
        return cy.get(':nth-child(3) > .form-group > .label')
    }
    availabilityFilterLabel() {
        return cy.get(':nth-child(4) > .form-group > .label')
    }
    proTypeFileterLabelPlaceholder() {
        return cy.get('.c-btn > :nth-child(1)')
    }
    availabilityFilterPlaceholder() {
        return cy.get('.form-control')
    }
    manageProjectsPageTitle() {
        return cy.get('.row > :nth-child(1) > .title')
    }
    arNameGridCol() {
        return cy.get('.cdk-column-arName > .mat-sort-header-container > .mat-sort-header-button')
    }
    enNameGridCol() {
        return cy.get('.cdk-column-enName > .mat-sort-header-container > .mat-sort-header-button')
    }
    proTypeNameGridCol() {
        return cy.get('.cdk-column-projectTypeName > .mat-sort-header-container > .mat-sort-header-button')
    }
    availabilityGridCol() {
        return cy.get('.cdk-column-availabilityStatusId > .mat-sort-header-container > .mat-sort-header-button')
    }
    operationsGridCol() {
        return cy.get('.mat-header-row > .cdk-column-operations')
    }
    addProjectDialogTitle() {
        return cy.get('e-topup-project-add.ng-star-inserted > :nth-child(1) > .col-md-12 > nb-card > nb-card-header > .title')
    }
    eNameDialogLabel() {
        return cy.get('.row > :nth-child(1) > .label > :nth-child(1)')
    }
    arNameDialogLabel() {
        return cy.get(':nth-child(2) > .label > :nth-child(1)')
    }
    proTypeDialogLabel() {
        return cy.get(':nth-child(3) > .label > :nth-child(1)')
    }
    availabilityDialogLabel() {
        return cy.get(':nth-child(4) > .label > :nth-child(1)')
    }
    dialogYesRadioBTN() {
        return cy.get(':nth-child(1) > label > .inner-circle')
    }
    dialogNoRadioBTN() {
        return cy.get(':nth-child(2) > label > .inner-circle')
    }
    dlpDialogLabel() {
        return cy.get('.label > .text')
    }
    dialogDlpCheckBox() {
        return cy.get('.custom-checkbox')
    }
    yesDialogLabel() {
        return cy.get('.justify-content-between > .d-flex > :nth-child(1) > label > .text')
    }
    noDialogLabel() {
        return cy.get(':nth-child(2) > label > .text')
    }
    eNameFilterTextField() {
        return cy.get(':nth-child(3) > .form-group > div > .input-full-width')
    }
    arNameFilterTextField() {
        return cy.get('.form-group > div > .text-right')

    }
    projectTypeFilter(type) {
        cy.get(':nth-child(2) > .form-group').within(() => {
            cy.contains(type).click({ force: true })
        })
        return this
    }
    availabilityFilter(index) {
        return cy.get(".form-control").select(index)
    }
    validationMessagesClass() {
        return cy.get('div[class="invalid-feedback ng-star-inserted"]')
    }
    eNameRequired() {
        return cy.get(':nth-child(1) > :nth-child(2) > .invalid-feedback > .ng-star-inserted')
    }
    arNameRequired() {
        return cy.get(':nth-child(2) > :nth-child(2) > .invalid-feedback > .ng-star-inserted')
    }
    proTypeeNameRequired() {
        return cy.get(':nth-child(3) > :nth-child(2) > .invalid-feedback > .ng-star-inserted')
    }
    availabilityRequired() {
        return cy.get(':nth-child(4) > :nth-child(2) > .invalid-feedback > .ng-star-inserted')
    }
    dialogEnameTextField(){
        return cy.get('input[name="enName"]')
     }
     dialogArnameTextField(){
         return cy.get('input[name="arName"]')
      }
    searchProjectEname(ename) {
       return cy.get(':nth-child(3) > .form-group > div > .input-full-width').type(ename)
    }
    addProject(ename, arname, type) {
        cy.get('input[name="enName"]').type(ename)
        cy.get('input[name="arName"]').type(arname)
        cy.get('.cdk-overlay-pane').within(() => {
            cy.contains(type).click({ force: true, multiple: true })
        })
        cy.get('input[value="1"]').check({ force: true })
        cy.get('span[class="custom-checkbox"]').click()
        cy.get('button[type=submit]').click()
        return this
    }
    editProject(ename,arName,type){
        this.dialogEnameTextField().clear()
        this.dialogEnameTextField().type(ename)
        this.dialogArnameTextField().clear()
        this.dialogArnameTextField().type(arName)
       cy.Dialog().within(()=>{
        cy.get('span[class="c-remove clear-all ng-star-inserted"]').click({force:true})
       }) 

         cy.get('.cdk-overlay-pane').within(() => {
           cy.contains(type).click({ force: true,multiple:true})
         })
         cy.get('input[value="1"]').check({ force: true })
         cy.get('button[type=submit]').click()
         return this
    }
    deleteTXT(){
    return cy.get('div[class="col-12 mb-4"]')
  }

   
}