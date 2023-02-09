before(() => {
    cy.login();
    cy.openManageDepartments()
})

describe('Manage Departments Suite', () => {
    describe('Manage Departments Text Validation', () => {
        it('Search Section Text Validation', () => {

            cy.get('nb-card-header > .title').contains('Search Departments')


            cy.get(':nth-child(1) > nb-card-body').within(() => {
                cy.get(':nth-child(1) > .form-group > .label').should('have.text', 'Department English Name')
                cy.get(':nth-child(2) > .form-group > .label').should('have.text', 'Department Arabic Name')
                cy.get(':nth-child(3) > .form-group > .label').should('have.text', 'Department Manager')
                cy.get(':nth-child(4) > .form-group > .label').should('have.text', 'Availability')
                cy.get('.btn-secondary').should('have.text', 'Search')
                cy.get('.btn-light').should('have.text', 'Clear')
                cy.get('.col-md-12 > .btn-dark').should('have.text', 'Add')
                cy.get('.row > :nth-child(3)').contains('Choose Department Manager')
                cy.get(':nth-child(4) > .form-group > div > .form-control').contains('Choose Availability')

            })


        })
        it('Grid Section Text Validation', () => {
               // cy.get(':nth-child(1) > :nth-child(2) > .row').within(()=>{
                    cy.get('.row > :nth-child(1) > .title').should('have.text', 'Departments')
                    cy.get('.mx-2 > img').should('be.visible')
                    cy.get('[title="Export To PDF"] > img').should('be.visible')
             //   })
              //  cy.get(':nth-child(2) > nb-card-body').contains(()=>{
                    cy.get('.cdk-column-enName > .mat-sort-header-container > .mat-sort-header-button')
                    .should('have.text', ' Department English Name ')
                cy.get('.cdk-column-arName > .mat-sort-header-container > .mat-sort-header-button')
                    .should('have.text', ' Department Arabic Name ')
                cy.get('.cdk-column-departmentManager > .mat-sort-header-container > .mat-sort-header-button')
                    .should('have.text', ' Department Manager ')
                cy.get('.cdk-column-isActive > .mat-sort-header-container > .mat-sort-header-button')
                    .should('have.text', ' Availability ')
                //.contains('Availability')
                cy.get('.mat-header-row > .cdk-column-operations').contains('Operations')
                cy.get(':nth-child(1) > .d-flex > .btn-info').should('have.text', 'Edit')
                cy.get(':nth-child(1) > .d-flex > .btn-danger').should('have.text', 'Delete')
                cy.get('.mat-paginator-page-size-label').should('have.text', 'Items per page:')
               // })
                
            

        })
        it('Add Department Dialog Text Validation', () => {
            cy.get(':nth-child(1) > nb-card-body').within(() => {
                cy.Add()
            })

            cy.get('mat-dialog-container[role="dialog"]').should('be.visible')
            cy.get('mat-dialog-container[role="dialog"]').within(() => {
                cy.get('app-department-add-edit.ng-star-inserted > :nth-child(1) > .col-md-12 > nb-card > nb-card-header > .title')
                    .should('have.text', 'Add Department')
                cy.get(':nth-child(1) > .label > :nth-child(1)').should('have.text', 'Department English Name')
                cy.get(':nth-child(2) > .label > :nth-child(1)').should('have.text', 'Department Arabic Name')
                cy.get(':nth-child(3) > .label > :nth-child(1)').should('have.text', 'Availability')
                cy.get(':nth-child(4) > .label > :nth-child(1)').should('have.text', 'Account Manager Availability')
                cy.get(':nth-child(5) > .label > :nth-child(1)').should('have.text', 'Eligible to view all "Gate pass" tickets')
                cy.SubmitBTN().should('have.text', 'Add')
                cy.AbortBTN().should('have.text', 'Cancel')
                cy.Abort()
                cy.reload()                
            })
        })
    })
    describe('Manage Departments Functionality', () => {

        describe('Filter Departments', () => {

            it('Filter By Department English Name', () => {
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.get(':nth-child(1) > .form-group > div > .input-full-width').type('CRM')
                    cy.Search()
                })
                cy.get('tbody > :nth-child(1) > .cdk-column-enName').contains('CRM')
            })
            it('Filter By Department Arabic Name', () => {
                cy.get(':nth-child(2) > nb-card-body').within(() => {
                    cy.get(':nth-child(1) > .form-group > div > .input-full-width').type('علاقات العملاء')
                    cy.Search()
                })
                cy.get('tbody > :nth-child(1) > .cdk-column-arName').contains('علاقات العملاء')

            })
            it('Filter By Department Manager', () => {
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.get(':nth-child(3) > .form-group').within(()=>{
                        cy.contains('Ahmed Saber').click()
                    })
                    cy.Search()
                })
                cy.get('.mat-row > .cdk-column-departmentManager').contains('Ahmed Saber')
            })

        })
        describe('Add Scenarios', () => {
            it('Fields Validation', () => {
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.Add()
                })
                cy.Dialog().within(() => {
                 cy.SubmitDialog()   
                 cy.get(':nth-child(2) > :nth-child(2) > .invalid-feedback > .ng-star-inserted')
                 .should('have.text','Department Arabic Name is required')
                cy.get(':nth-child(1) > :nth-child(2) > .invalid-feedback > .ng-star-inserted')
                .should('have.text','Department English Name is required')
               })
                cy.reload()
            })
            it('abort without adding', () => {
                cy.reload()
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.Add()
                })

                cy.get('mat-dialog-container[role="dialog"]').should('be.visible')
                cy.get('mat-dialog-container[role="dialog"]').within(() => {
                    cy.Abort()
                })
                cy.reload()

            })
            it('Add Department', () => {
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.Add()
                })
                cy.Dialog().within(() => {
                    cy.get('.row > :nth-child(1) > div > .form-control').type('Demo Department')
                    cy.get(':nth-child(2) > div > .form-control').type('ديمو')
                    cy.SubmitDialog()
                })
                cy.Toast().contains("Department Created Successfully")
                cy.reload()

            })
            it('add already existing Department', () => {
                cy.get(':nth-child(1) > nb-card-body').within(() => {
                    cy.Add()
                })
                cy.Dialog().within(() => {
                    cy.get('.row > :nth-child(1) > div > .form-control').type('Demo Department')
                    cy.get(':nth-child(2) > div > .form-control').type('ديمو')
                    cy.SubmitDialog()
                })
                cy.Toast().contains("Department name is already exists")
                cy.reload()

            })


        })
        // describe('Edit Scenarios', () => {
        //     it('cancel without editing', () => {
        //         cy.get(':nth-child(1) > nb-card-body').within(() => {
        //             cy.get(':nth-child(1) > .form-group > div > .input-full-width').type('Demo Department')
        //             cy.Search()
        //         })

        //         cy.wait(500)
        //         cy.Edit()
        //         cy.Abort()
        //         cy.wait(500)
        //         cy.get('mat-dialog-container[role="dialog"]').should('not.exist')
        //         cy.reload()
        //     })
        //     it('update without changing', () => {
        //         cy.get(':nth-child(1) > nb-card-body').within(() => {
        //             cy.get(':nth-child(1) > .form-group > div > .input-full-width').type('Demo Department')
        //             cy.Search()
        //         })
        //         cy.wait(500)
        //         cy.Edit()
        //         cy.SubmitDialog()
        //         cy.Toast().should('be.visible')
        //         cy.Toast().should('have.text', 'Department Updated Successfully')
        //         cy.reload()
        //     })
        //     it('update to already existing Department', () => {
        //         cy.get(':nth-child(1) > nb-card-body').within(() => {
        //             cy.get(':nth-child(1) > .form-group > div > .input-full-width').type('Demo Department')
        //             cy.Search()
        //         })
        //         cy.wait(500)
        //         cy.Edit()
        //         cy.Dialog().within(() => {
        //             cy.get('.row > :nth-child(1) > div > .form-control').clear()
        //             cy.get('.row > :nth-child(1) > div > .form-control').type('CRM')

        //             cy.SubmitDialog()
        //         })
        //         cy.Toast().should('be.visible')
        //         cy.Toast().should('have.text', 'Department name is already exists')
        //         cy.reload()
        //     })
        //     it('update with correct values', () => {
        //         cy.get(':nth-child(1) > nb-card-body').within(() => {
        //             cy.get(':nth-child(1) > .form-group > div > .input-full-width').type('Demo Department')
        //             cy.Search()
        //         })
        //         cy.wait(500)
        //         cy.Edit()
        //         cy.Dialog().within(() => {
        //             cy.get('.row > :nth-child(1) > div > .form-control').clear()
        //             cy.get('.row > :nth-child(1) > div > .form-control').type('Demo Department')
        //             cy.SubmitDialog()
        //         })
        //         cy.Toast().should('be.visible')
        //         cy.Toast().should('have.text', 'Department Updated Successfully')
        //         cy.reload()
        //     })

        // })
        // describe('Delete Scenarios', () => {
        //     it('Abort Delete', () => {
        //         cy.get(':nth-child(1) > nb-card-body').within(() => {
        //             cy.get(':nth-child(1) > .form-group > div > .input-full-width').type('Demo Department')
        //             cy.Search()
        //         })
        //         cy.wait(500)
        //         cy.Delete()
        //         cy.Dialog().should('be.visible')
        //         cy.get('div[class="col-12 mb-4"]').should('have.text', ' Are you sure you want to delete this department ? ')
        //         cy.Abort()
        //         cy.Dialog().should('not.exist')
        //         cy.reload()
        //     })
        //     it('Delete Test Department', () => {
        //         cy.get(':nth-child(1) > nb-card-body').within(() => {
        //             cy.get(':nth-child(1) > .form-group > div > .input-full-width').type('Demo Department')
        //             cy.Search()
        //         })
        //         cy.wait(500)
        //         cy.Delete()
        //         cy.Dialog().should('be.visible')
        //         cy.get('div[class="col-12 mb-4"]').should('have.text', ' Are you sure you want to delete this department ? ')
        //         cy.ConfirmDelete()
        //         cy.get('.message').should('be.visible')
        //         cy.get('.message').should('have.text', 'Unit Deleted Successfully')
        //         cy.reload()
        //     })
        // })
    })
})