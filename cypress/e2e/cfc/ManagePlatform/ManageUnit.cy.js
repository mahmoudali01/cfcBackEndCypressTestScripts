before(() => {
    cy.login();
    cy.openManageUnits()
})
describe('Manage Units Suite', () => {
    describe('Manage Units Text Validation', () => {
        it('Search Section Text Validation', () => {

            cy.get('nb-card-header > .title').contains('Search Units')


            cy.get(':nth-child(1) > nb-card-body').within(() => {
                //cy.get('.nb-card-header').within(()=>{
                //  cy.get('h2[class="title"]').should('have.text','Search Units')
                // })

                cy.get(':nth-child(1) > .form-group > .label').should('have.text', 'Project Type')
                cy.get(':nth-child(2) > .form-group > .label').should('have.text', 'Project Name')
                cy.get(':nth-child(3) > .form-group > .label').should('have.text', 'Building Number')
                cy.get(':nth-child(4) > .form-group > .label').should('have.text', 'Floor')
                cy.get(':nth-child(5) > .form-group > .label').should('have.text', 'Unit Number')
                cy.get(':nth-child(6) > .form-group > .label').should('have.text', 'Availability')
                cy.get('.btn-secondary').should('have.text', 'Search')
                cy.get('.btn-light').should('have.text', 'Clear')
                cy.get('.col-md-12 > .btn-dark').should('have.text', 'Add')
                // cy.get(':nth-child(1) > .form-group > div[_ngcontent-yuu-c450=""] > .custom-class')
                // .contains('Choose Project Type')
                // cy.get(':nth-child(2) > .form-group > div[_ngcontent-yuu-c450=""] > .custom-class')
                // .contains('Choose Project')
                // cy.get(':nth-child(3) > .form-group > div[_ngcontent-yuu-c450=""] > .custom-class')
                // .contains('Choose Building')
                cy.get(':nth-child(6) > .form-group > div > .form-control').contains('Choose Availability')
            })


        })
        it('Grid Section Text Validation', () => {
            cy.get('.row > :nth-child(1) > .title').should('have.text', 'Units')
            cy.get('.mx-2 > img').should('be.visible')
            cy.get('[title="Export To PDF"] > img').should('be.visible')
            cy.get('.mat-header-row > .cdk-column-UnitNumber').should('have.text', ' Unit Number ')
            cy.get('.mat-header-row > .cdk-column-Floor').should('have.text', ' Floor ')
            cy.get('.cdk-column-BuildingNumber > .mat-sort-header-container > .mat-sort-header-button').should('have.text', ' Building Number ')
            cy.get('.cdk-column-ProjectName > .mat-sort-header-container > .mat-sort-header-button').should('have.text', ' Project Name ')
            cy.get('.cdk-column-ProjectType > .mat-sort-header-container > .mat-sort-header-button').should('have.text', ' Project Type ')
            cy.get('.cdk-column-Availability > .mat-sort-header-container > .mat-sort-header-button').contains('Availability')
            cy.get('.mat-header-row > .cdk-column-operations').contains('Operations')
            cy.get(':nth-child(1) > .d-flex > .btn-dark').should('have.text', 'View Unit Accounts')
            cy.get(':nth-child(1) > .d-flex > .btn-info').should('have.text', 'Edit')
            cy.get(':nth-child(1) > .d-flex > .btn-danger').should('have.text', 'Delete')
            cy.get('.mat-paginator-page-size-label').should('have.text', 'Items per page:')
        })
        it('Add Unit Dialog Text Validation', () => {
            cy.get(':nth-child(1) > nb-card-body').within(() => {
                cy.Add()
            })

            cy.get('mat-dialog-container[role="dialog"]').should('be.visible')

            cy.get('mat-dialog-container[role="dialog"]').within(() => {

                cy.get('e-topup-unit-add-edit.ng-star-inserted > :nth-child(1) > .col-md-12 > nb-card > nb-card-header > .title')
                    .should('have.text', 'Add Unit')
                cy.get(':nth-child(1) > .label > :nth-child(1)').should('have.text', 'Project Name')
                cy.get(':nth-child(2) > .label > :nth-child(1)').should('have.text', 'Building')
                cy.get(':nth-child(3) > .label > :nth-child(1)').should('have.text', 'Unit Number')
                cy.get(':nth-child(4) > .label > span').should('have.text', 'Floor Number')
                cy.get(':nth-child(5) > .label > :nth-child(1)').should('have.text', 'Availability')
                cy.get(':nth-child(5) > div > .form-control').contains('Choose Availability')
                cy.SubmitBTN().should('have.text', 'Add')
                cy.AbortBTN().should('have.text', 'Cancel')
                cy.Abort()
                cy.reload()

            })


        })
        it('View Unit Accounts with no delegated Account Text Validation', () => {
            cy.get(':nth-child(1) > nb-card-body').within(() => {
                cy.get(':nth-child(1) > .form-group').within(() => { cy.contains('Apartments').click({ force: true }) })
                cy.get(':nth-child(2) > .form-group').within(() => { cy.contains('CypressProject').click({ force: true }) })
                cy.get(':nth-child(3) > .form-group').within(() => { cy.contains('Test').click({ force: true }) })
                cy.get(':nth-child(5) > .form-group > div > .form-control').type('Test1')
                cy.get(':nth-child(4) > .form-group > div > .form-control').type('1')
                // cy.get('form.ng-untouched > .row > .col-md-12').within(()=>{cy.Search()})
                cy.Search()
            })


            cy.get(':nth-child(2) > nb-card-body').within(() => {
                cy.get(':nth-child(1) > .d-flex > .btn-dark').click()
            })
            cy.get('mat-dialog-container[role="dialog"]').should('be.visible')

            cy.Dialog().within(() => {
                cy.get('.title').should('have.text', 'Unit Accounts')
                cy.get('div[class="text-md-center mt-3 ng-star-inserted"]').contains('No Data Found')
                cy.get('.btn-dark').should('have.text','Close')
                cy.get('.btn-dark').click()
            })
            cy.reload()
        })
        it('View Unit Accounts with  delegated Account Text Validation', () => {
            cy.get(':nth-child(1) > nb-card-body').within(() => {
                cy.get(':nth-child(1) > .form-group').within(() => { cy.contains('Apartments').click({ force: true }) })
                cy.get(':nth-child(2) > .form-group').within(() => { cy.contains('CypressProject').click({ force: true }) })
                cy.get(':nth-child(3) > .form-group').within(() => { cy.contains('Test').click({ force: true }) })
                cy.get(':nth-child(5) > .form-group > div > .form-control').type('TUA')
                cy.get(':nth-child(4) > .form-group > div > .form-control').type('1')
                // cy.get('form.ng-untouched > .row > .col-md-12').within(()=>{cy.Search()})
                cy.Search()
            })


            cy.get(':nth-child(2) > nb-card-body').within(() => {
                cy.get(':nth-child(1) > .d-flex > .btn-dark').click()
            })
            cy.Dialog().should('be.visible')

            cy.Dialog().within(() => {
                cy.get('.title').should('have.text', 'Unit Accounts')
                cy.get('table[class="table sla ng-star-inserted"]').should('be.visible')
               //cy.get('.table sla ng-star-inserted').children()
              // cy.children()
             // cy.get('.ng-star-inserted')
            //  cy.get('th[class="ng-star-inserted"]')
            //     .should('contains','Email')
            //     .and('contains','Mobile Number')
            //     .and('contains','Ownership Type')
            // cy.get('td[class="ng-star-inserted"]')
            //     .should('contains','client_tx9gh@gmail.com')
            //     .and('contains','+201091014618')
            //     .and('contains','Owner')
                cy.get('.btn-dark').click()
            })
            cy.reload()
        })
    })
    describe('Manage Units Functionality', () => {

        describe('Filter Units', () => {

            it('Filter By Project Type', () => {
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.get(':nth-child(1) > .form-group').within(() => { cy.contains('Apartments').click({ force: true }) })
                    cy.Search()
                })
                cy.get('tbody > :nth-child(1) > .cdk-column-ProjectType').contains('Apartments')
            })
            it('Filter By Project Name', () => {
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.get(':nth-child(2) > .form-group').within(() => { cy.contains('CypressProject').click({ force: true }) })
                    cy.Search()
                })
                cy.get('tbody > :nth-child(1) > .cdk-column-ProjectName').contains('CypressProject')

            })
            it('Filter By Building Number', () => {
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.get(':nth-child(3) > .form-group').within(() => { cy.contains('Test').click({ force: true }) })
                    cy.Search()
                })
                cy.get('tbody > :nth-child(1) > .cdk-column-BuildingNumber').contains('Test')
            })
            it('Filter By Unit Number', () => { 
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.get(':nth-child(5) > .form-group > div > .form-control').type('Test1')
                    cy.Search()
                })
                cy.get('tbody > :nth-child(1) > .cdk-column-UnitNumber').contains('Test1')
            })
            it('Filter By Floor', () => { 
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.get(':nth-child(4) > .form-group > div > .form-control').type('1')
                    cy.Search()
                })
                cy.get('tbody > :nth-child(1) > .cdk-column-Floor').contains('1')
            })




        })
        describe('Add Scenarios', () => {
            it('Fields Validation',()=>{
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.Add()
                })
                cy.Dialog().within(()=>{
                    cy.SubmitDialog()
                    cy.get('.invalid-feedback > .ng-star-inserted').should('have.text','Project name is required')
                    cy.contains("CypressProject").click({force: true})
                    cy.SubmitDialog()
                    cy.get('.invalid-feedback > .ng-star-inserted').should('have.text','Building is required')
                    cy.contains("Test").click({force: true})
                    cy.SubmitDialog()
                    cy.get(':nth-child(3) > :nth-child(2) > .invalid-feedback > .ng-star-inserted')
                    .should('have.text','Unit number is required')
                    cy.get(':nth-child(5) > :nth-child(2) > .invalid-feedback > .ng-star-inserted')
                    .should('have.text','Availability is required')
            
                }) 
                cy.reload()
            })
            it('abort without adding',()=>{
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.Add()
                })
    
                cy.get('mat-dialog-container[role="dialog"]').should('be.visible')
                cy.get('mat-dialog-container[role="dialog"]').within(()=>{
                    cy.Abort()
                })
                cy.reload()

            })
            it('add unit',()=>{
                // cy.get('form.ng-valid > .row > .col-md-12').within(() => {
                //     cy.Add()
                // })
               // cy.get('.col-md-12 > .btn-dark').click()
               cy.get(':nth-child(1) > nb-card-body').within(() => {
                cy.Add()
            })
                cy.Dialog().within(()=>{
                    cy.contains("CypressProject").click({force: true})
                    cy.contains('Test').click({force: true})
                    cy.get(':nth-child(3) > div > .form-control').type('demoUnit')
                    cy.get(':nth-child(4) > div > .form-control').type('1')
                    cy.get('[name=availabilityStatusId]').select('Yes')
                    cy.get(' [type="submit"]').click()
                })
                cy.Toast().contains("Unit Created Successfully")
                cy.reload()

            })
            it('add already existing unit',()=>{
                // cy.get('form.ng-valid > .row > .col-md-12').within(() => {
                //     cy.Add()
                // })
           //  cy.get('.col-md-12 > .btn-dark').click()
           cy.get(':nth-child(1) > nb-card-body').within(() => {
            cy.Add()
           })

                cy.Dialog().within(()=>{
                    cy.contains("CypressProject").click({force: true})
                    cy.contains('Test').click({force: true})
                    cy.get(':nth-child(3) > div > .form-control').type('demoUnit')
                    cy.get(':nth-child(4) > div > .form-control').type('1')
                    cy.get('[name=availabilityStatusId]').select('Yes')
                    cy.get(' [type="submit"]').click()
                })
                cy.Toast().contains("There is unit with this number in the same building")
                 cy.reload()
            })


        })
        describe('Edit Scenarios', () => {
            it('cancel without editing', () => {
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.get(':nth-child(1) > .form-group').within(() => { cy.contains('Apartments').click({ force: true }) })
                    cy.get(':nth-child(2) > .form-group').within(() => { cy.contains('CypressProject').click({ force: true }) })
                    cy.get(':nth-child(3) > .form-group').within(() => { cy.contains('Test').click({ force: true }) })
                    cy.get(':nth-child(5) > .form-group > div > .form-control').type('demoUnit')
                    cy.get(':nth-child(4) > .form-group > div > .form-control').type('1')
                    // cy.get('form.ng-untouched > .row > .col-md-12').within(()=>{cy.Search()})
                    cy.Search()
                })
    
                cy.wait(500)
                cy.Edit()
                cy.Abort()
                cy.wait(500)
                cy.get('mat-dialog-container[role="dialog"]').should('not.exist')
                cy.reload()
            })
            it('update without changing', () => {
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.get(':nth-child(1) > .form-group').within(() => { cy.contains('Apartments').click({ force: true }) })
                    cy.get(':nth-child(2) > .form-group').within(() => { cy.contains('CypressProject').click({ force: true }) })
                    cy.get(':nth-child(3) > .form-group').within(() => { cy.contains('Test').click({ force: true }) })
                    cy.get(':nth-child(5) > .form-group > div > .form-control').type('demoUnit')
                    cy.get(':nth-child(4) > .form-group > div > .form-control').type('1')
                    // cy.get('form.ng-untouched > .row > .col-md-12').within(()=>{cy.Search()})
                    cy.Search()
                })
                cy.wait(500)
                cy.Edit()
                cy.SubmitDialog()
                cy.Toast().should('be.visible')
                cy.Toast().should('have.text', 'Unit Updated Successfully')
                cy.reload()
            })
            it('update to already existing building', () => {
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.get(':nth-child(1) > .form-group').within(() => { cy.contains('Apartments').click({ force: true }) })
                    cy.get(':nth-child(2) > .form-group').within(() => { cy.contains('CypressProject').click({ force: true }) })
                    cy.get(':nth-child(3) > .form-group').within(() => { cy.contains('Test').click({ force: true }) })
                    cy.get(':nth-child(5) > .form-group > div > .form-control').type('demoUnit')
                    cy.get(':nth-child(4) > .form-group > div > .form-control').type('1')
                    // cy.get('form.ng-untouched > .row > .col-md-12').within(()=>{cy.Search()})
                    cy.Search()
                })
                cy.wait(500)
                cy.Edit()
                cy.Dialog().within(()=>{
                    cy.contains("CypressProject").click({force: true})
                    cy.contains('Test').click({force: true})
                    cy.get(':nth-child(3) > div > .form-control').clear()
                    cy.get(':nth-child(3) > div > .form-control').type('Test1')
                    cy.get(':nth-child(4) > div > .form-control').clear()
                    cy.get(':nth-child(4) > div > .form-control').type('1')
                    cy.get('[name=availabilityStatusId]').select('Yes')
                    cy.SubmitDialog()
                })
                cy.Toast().should('be.visible')
                cy.Toast().should('have.text', 'There is unit with this number in the same building')
                cy.reload()
            })
            it('update with correct values', () => {
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.get(':nth-child(1) > .form-group').within(() => { cy.contains('Apartments').click({ force: true }) })
                    cy.get(':nth-child(2) > .form-group').within(() => { cy.contains('CypressProject').click({ force: true }) })
                    cy.get(':nth-child(3) > .form-group').within(() => { cy.contains('Test').click({ force: true }) })
                    cy.get(':nth-child(5) > .form-group > div > .form-control').type('demoUnit')
                    cy.get(':nth-child(4) > .form-group > div > .form-control').type('1')
                    // cy.get('form.ng-untouched > .row > .col-md-12').within(()=>{cy.Search()})
                    cy.Search()
                })
                cy.wait(500)
                cy.Edit()
                cy.Dialog().within(()=>{
                    cy.contains("CypressProject").click({force: true})
                    cy.contains('Test').click({force: true})
                    cy.get(':nth-child(3) > div > .form-control').clear()
                    cy.get(':nth-child(3) > div > .form-control').type('demoUnit')
                    cy.get(':nth-child(4) > div > .form-control').clear()
                    cy.get(':nth-child(4) > div > .form-control').type('1')
                    cy.get('[name=availabilityStatusId]').select('Yes')
                    cy.SubmitDialog()
                })
                cy.Toast().should('be.visible')
                cy.Toast().should('have.text', 'Unit Updated Successfully')
                cy.reload()
            })

        })
        describe('Delete Scenarios', () => {
            it('Abort Delete', () => {
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.get(':nth-child(1) > .form-group').within(() => { cy.contains('Apartments').click({ force: true }) })
                    cy.get(':nth-child(2) > .form-group').within(() => { cy.contains('CypressProject').click({ force: true }) })
                    cy.get(':nth-child(3) > .form-group').within(() => { cy.contains('Test').click({ force: true }) })
                    cy.get(':nth-child(5) > .form-group > div > .form-control').type('demoUnit')
                    cy.get(':nth-child(4) > .form-group > div > .form-control').type('1')
                    // cy.get('form.ng-untouched > .row > .col-md-12').within(()=>{cy.Search()})
                    cy.Search()
                })
                cy.wait(500)
                cy.Delete()
                cy.get('mat-dialog-container[role="dialog"]').should('be.visible')
                cy.get('div[class="col-12 mb-4"]').should('have.text', ' Are you sure you want to delete this unit ? ')
                cy.Abort()
                cy.get('mat-dialog-container[role="dialog"]').should('not.exist')
                cy.reload()
            })
            it('Delete Test Unit', () => {
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.get(':nth-child(1) > .form-group').within(() => { cy.contains('Apartments').click({ force: true }) })
                    cy.get(':nth-child(2) > .form-group').within(() => { cy.contains('CypressProject').click({ force: true }) })
                    cy.get(':nth-child(3) > .form-group').within(() => { cy.contains('Test').click({ force: true }) })
                    cy.get(':nth-child(5) > .form-group > div > .form-control').type('demoUnit')
                    cy.get(':nth-child(4) > .form-group > div > .form-control').type('1')
                    // cy.get('form.ng-untouched > .row > .col-md-12').within(()=>{cy.Search()})
                    cy.Search()
                })
                cy.wait(500)
                cy.Delete()
                cy.Dialog().should('be.visible')
                cy.get('div[class="col-12 mb-4"]').should('have.text', ' Are you sure you want to delete this unit ? ')
                cy.ConfirmDelete()
                cy.get('.message').should('be.visible')
                cy.get('.message').should('have.text', 'Unit Deleted Successfully')
                cy.reload()
            })
        })
    })
})