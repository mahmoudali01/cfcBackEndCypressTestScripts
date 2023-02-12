import { ManageProject } from "../../../Pages/ManagePlatform/ManageProject"
const mProject = new ManageProject()
before(() => {
  cy.login();
  cy.openManageProject()
})

describe('Manage Project Suite', () => {
  describe('Manage Project text validation', () => {

    it('Search card text', () => {
      mProject.arNameFilterLabel().should('have.text', 'Arabic Name')
      mProject.erNameFilterLabel().should('have.text', 'English Name')

      mProject.proTypeFileterLabel().should('have.text', 'Project Type')

      mProject.availabilityFilterLabel().should('have.text', 'Availability')
      mProject.proTypeFileterLabelPlaceholder().should('have.text', 'Choose Project Type')

      mProject.availabilityFilterPlaceholder().contains('Availability')

      cy.ClearBTN().should('have.text', 'Clear')
      cy.SearchBTN().should('have.text', 'Search')
      cy.AddBTN().should('have.text', 'Add')

    })
    it('project grid section Text', () => {
      mProject.manageProjectsPageTitle().should('have.text', 'Projects')
      mProject.arNameGridCol().should('have.text', ' Arabic Name ')

      mProject.enNameGridCol().should('have.text', ' English Name')
      mProject.proTypeNameGridCol().should('have.text', ' Project Type Name ')
      cy.exportToExcel().should('be.visible')
      cy.exportToPdf().should('be.visible')
      mProject.availabilityGridCol().contains('Availability')
      mProject.operationsGridCol().contains('Operations')
      //first two row of the grid edit delete button text
      cy.get(':nth-child(1) > .d-flex > .btn-info').should('have.text', 'Edit')
      cy.get(':nth-child(1) > .d-flex > .btn-danger').should('have.text', 'Delete')
      cy.paginatorTXT().should('have.text', 'Items per page:')
    })
    it('add project dialog text', () => {
      cy.Add()
      cy.Dialog().should('be.visible')
      mProject.addProjectDialogTitle().should('have.text', 'Add Project')
      mProject.eNameDialogLabel().should('have.text', 'English Name')
      mProject.arNameDialogLabel().should('have.text', 'Arabic Name')
      mProject.proTypeDialogLabel().should('have.text', 'Project Type')
      mProject.availabilityDialogLabel().should('have.text', 'Availability')
      mProject.yesDialogLabel().should('have.text', ' Yes ')
      mProject.dialogYesRadioBTN().should('not.be.checked')
      mProject.noDialogLabel().should('have.text', ' No ')
      mProject.dialogNoRadioBTN().should('not.be.checked')
      mProject.dlpDialogLabel().should('have.text', ' Include DLP ')
      mProject.dialogDlpCheckBox().should('not.be.checked')
      cy.reload()

    })
  })
  describe('Manage Project functions tests', () => {
    describe('filter suite', () => {

      it('search by english name', () => {
      mProject.eNameFilterTextField().clear()
      mProject.eNameFilterTextField().type('Paradise')
        cy.Search()
        cy.get('.mat-paginator-range-label').should('have.text', '1 – 1 of 1')
        cy.get('.mat-row > .cdk-column-arName').should('have.text', ' الفردوس ')
        cy.get('.mat-row > .cdk-column-enName').should('have.text', ' Paradise ')
        cy.get(':nth-child(3) > .form-group > div > .input-full-width').clear()
        cy.Clear()
      })
      it('search by arabic name', () => {
        mProject.arNameFilterTextField().clear()
        mProject.arNameFilterTextField().type('الفردوس')
        cy.Search()
        cy.get('.mat-paginator-range-label').should('have.text', '1 – 1 of 1')
        cy.get('.mat-row > .cdk-column-arName').should('have.text', ' الفردوس ')
        cy.get('.mat-row > .cdk-column-enName').should('have.text', ' Paradise ')
        cy.get('.form-group > div > .text-right').clear()
        cy.Clear()
      })
      it('filter by project type', () => {
        //Apartments project type
       // cy.get('.c-btn').click({ force: true })
        // cy.get('.c-btn').contains('Choose Project Type').dblclick()
        //  cy.reload();
        //  cy.get('angular2-multiselect[name="projectTypeId"]').click()
    //cy.get('.lazyContainer > :nth-child(1)').click()
        mProject.projectTypeFilter('Apartments')
        cy.Search()
        cy.get('.mat-row > .cdk-column-projectTypeName').contains('Apartments')
        cy.Clear()
        /////////////////////
        mProject.projectTypeFilter('Villas')
        cy.Search()
        cy.get('.mat-row > .cdk-column-projectTypeName').contains('Villas')
        cy.Clear()
        /////////////////////
        mProject.projectTypeFilter('Offices')
        cy.Search()
        cy.get('.mat-row > .cdk-column-projectTypeName').contains('Offices')
        cy.Clear()
        ///////////////////////
        mProject.projectTypeFilter('Duplex Apartment')
        cy.Search()
        cy.get('.mat-row > .cdk-column-projectTypeName').contains('Duplex Apartment')
        cy.Clear()
        //////////////////////////////
        // //villas project type
        // cy.get('.c-btn').click({ force: true })
        // cy.get('.lazyContainer > :nth-child(2)').click()
        // cy.Search()
        // cy.get('.mat-row > .cdk-column-projectTypeName').contains('Villas')
        // cy.Clear()
        // //offices project type
        // cy.get('.c-btn').click({ force: true })
        // cy.get('.lazyContainer > :nth-child(3)').click()
        // cy.Search()
        // cy.get('.mat-row > .cdk-column-projectTypeName').contains('Offices')
        // cy.Clear()
        // //Duplex apartments project type
        // cy.get('.c-btn').click({ force: true })
        // cy.get('.lazyContainer > :nth-child(4)').click()
        // cy.Search()
        // cy.get('.mat-row > .cdk-column-projectTypeName').contains('Duplex Apartment')
        // cy.Clear()
      })

      it('filter by availability', () => {
        //cy.get('.form-control').click({force:true})
        mProject.availabilityFilter('1')
        cy.Search()
        cy.get('.mat-row > .cdk-column-availabilityStatusId').contains('Yes')
        cy.Clear()
        mProject.availabilityFilter('2')
        cy.Search()
        cy.get('.mat-row > .cdk-column-availabilityStatusId').contains('No')
        cy.Clear()

      })
    })
    describe('project operations', () => {

      describe('add project', () => {

        it('add project with no values', () => {
          cy.Add()

         // cy.get('.ng-invalid.ng-star-inserted > .row > .col-12.text-right > .btn-dark').click()
          cy.Dialog().within(()=>{
            cy.Add()
          })
          mProject.validationMessagesClass().children().should('have.length', 4)
          mProject.eNameRequired().should('have.text', 'English name is required')
          mProject.arNameRequired().should('have.text', 'Arabic name is required')
          mProject.proTypeeNameRequired().should('have.text', 'Project type is required')
          mProject.availabilityRequired().should('have.text', 'Availability is required ')
          cy.reload()
        })
        it('add project', () => {
          cy.Add()
          mProject.addProject('test','تست','Apartments')
          cy.Toast().should('have.text', 'Project Created Successfully')
          cy.reload()
        })
        it('add existing project', () => {
          cy.Add()
          mProject.addProject('test','تست','Apartments')
          cy.Toast().should('have.text', 'Project Already Exist')     
          cy.reload()

        })

      })
      describe('edit project', () => {
        it('canel without editing', () => {
          cy.Clear()
          mProject.searchProjectEname('test')
          cy.Search()
          cy.wait(500)
          cy.Edit()
          cy.Abort()
          cy.Dialog().should('not.exist')
          cy.reload()

        })
        it('save with no changes', () => {
          cy.Clear()
          mProject.searchProjectEname('test')
          cy.Search()
          cy.wait(500)
          cy.Edit()
          cy.SubmitDialog()
          cy.Toast().should('be.visible')
          cy.Toast().should('have.text', 'Project Updated Successfully')
          cy.reload()

        })
        it('Edit with new values', () => {
          cy.Clear()
          mProject.searchProjectEname('test')
          cy.Search()
          cy.wait(500)
          cy.Edit()
       //   cy.Dialog().within(()=>{
            mProject.editProject('test','تست','Apartments')
        //  })
          cy.Toast().should('be.visible')
          cy.Toast().should('have.text', 'Project Updated Successfully')
          cy.reload()
        })
        it('Edit to already Existing project', () => {
          cy.Clear()
          mProject.searchProjectEname('test')
          cy.Search()
          cy.wait(500)
          cy.Edit()
         // cy.Dialog().within(()=>{
            mProject.editProject('CypressProject','CypressProject','Apartments')
        // })
          
          cy.Toast().should('be.visible')
          cy.Toast().should('have.text', 'Project Already Exist')
          cy.reload()
        })
      })
      describe('delete project', () => {
        it('abort delete', () => {
          cy.Clear()
          mProject.searchProjectEname('test')
          cy.Search()
          cy.wait(500)
          cy.Delete()
          cy.Dialog().should('be.visible')
         mProject.deleteTXT().should('have.text', ' Are you sure you want to delete this project ? ')
          cy.Abort()
          cy.Dialog().should('not.exist')
          cy.reload()
        })
        it('delete test project', () => {
          cy.Clear()
          mProject.searchProjectEname('test')
          cy.Search()
          cy.wait(500)
          cy.Delete()
          cy.Dialog().should('be.visible')
          mProject.deleteTXT().should('have.text', ' Are you sure you want to delete this project ? ')
          cy.SubmitDialog()
          cy.Toast().should('be.visible')
          cy.Toast().should('have.text', 'Project Deleted Successfully')
          cy.reload()
        })


      })
    })
  })

})
// after(() => {
//   cy.then(Cypress.session.clearCurrentSessionData)
// })