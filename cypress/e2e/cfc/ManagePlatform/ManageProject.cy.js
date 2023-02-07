
before(()=>{
    cy.login();
    cy.openManageProject()
})

describe('Manage Project Suite',()=>{
describe('Manage Project text validation',()=>{

it('Search card text',()=>{
    cy.get(':nth-child(1) > .form-group > .label').should('have.text','Arabic Name')    
    cy.get(':nth-child(3) > .form-group > .label').should('have.text','English Name')    

    cy.get(':nth-child(2) > .form-group > .label').should('have.text','Project Type')    

    cy.get(':nth-child(4) > .form-group > .label').should('have.text','Availability')    

    cy.get('.c-btn > :nth-child(1)').should('have.text','Choose Project Type')    

    cy.get('.form-control').contains('Availability')    

    cy.get('.btn-light').should('have.text','Clear')    
    cy.get('.btn-secondary').should('have.text','Search')    
    cy.get('.btn-dark').should('have.text','Add')    

})
it('project grid section Text',()=>{
    cy.get('.row > :nth-child(1) > .title').should('have.text','Projects')
    cy.get('.cdk-column-arName > .mat-sort-header-container > .mat-sort-header-button')
    .should('have.text',' Arabic Name ')
    cy.get('.cdk-column-enName > .mat-sort-header-container > .mat-sort-header-button')
    .should('have.text',' English Name')
    cy.get('.cdk-column-projectTypeName > .mat-sort-header-container > .mat-sort-header-button')
    .should('have.text',' Project Type Name ')
    cy.get('.mx-2 > img').should('be.visible')
    cy.get('[title="Export To PDF"] > img').should('be.visible')
    cy.get('.cdk-column-availabilityStatusId > .mat-sort-header-container > .mat-sort-header-button')
    .contains('Availability')
    cy.get('.mat-header-row > .cdk-column-operations')
    .contains('Operations')
    //first two row of the grid edit delete button text
    cy.get(':nth-child(1) > .d-flex > .btn-info').should('have.text','Edit')
    cy.get(':nth-child(1) > .d-flex > .btn-danger').should('have.text','Delete')
    cy.get('.mat-paginator-page-size-label').should('have.text','Items per page:')
})
it('add project dialog text',()=>{
  cy.Add() 
  cy.wait(500)
  cy.get('e-topup-project-add.ng-star-inserted > :nth-child(1) > .col-md-12').should('be.visible')
  cy.get('e-topup-project-add.ng-star-inserted > :nth-child(1) > .col-md-12 > nb-card > nb-card-header > .title').should('have.text','Add Project')
  cy.get('.row > :nth-child(1) > .label > :nth-child(1)').should('have.text','English Name')
  cy.get(':nth-child(2) > .label > :nth-child(1)').should('have.text','Arabic Name')
  cy.get(':nth-child(3) > .label > :nth-child(1)').should('have.text','Project Type')
  //cy.get('div[_ngcontent-qmy-c467=""] > .custom-class > .cuppa-dropdown > .selected-list > .c-btn')
//   cy.get('div[_ngcontent-qmy-c467=""] > .custom-class > .cuppa-dropdown > .selected-list > .c-btn > :nth-child(1)')
//  .contains('Choose Project Type')
  cy.get(':nth-child(4) > .label > :nth-child(1)').should('have.text','Availability')
  cy.get('.justify-content-between > .d-flex > :nth-child(1) > label > .text').should('have.text',' Yes ')
  cy.get(':nth-child(1) > label > .inner-circle').should('not.be.checked')
  cy.get(':nth-child(2) > label > .text').should('have.text',' No ')
  cy.get(':nth-child(2) > label > .inner-circle').should('not.be.checked')
  cy.get('.label > .text').should('have.text',' Include DLP ')
  cy.get('.custom-checkbox').should('not.be.checked')
  cy.reload()

})
})
describe('Manage Project functions tests',()=>{
  describe('filter suite',()=>{

  it('search by english name',()=>{
    cy.get(':nth-child(3) > .form-group > div > .input-full-width').clear()
    cy.get(':nth-child(3) > .form-group > div > .input-full-width').type('Paradise')
    cy.get('.btn-secondary').click()
    cy.get('.mat-paginator-range-label').should('have.text','1 – 1 of 1')
    cy.get('.mat-row > .cdk-column-arName').should('have.text',' الفردوس ')
    cy.get('.mat-row > .cdk-column-enName').should('have.text',' Paradise ')
    cy.get(':nth-child(3) > .form-group > div > .input-full-width').clear()
    //Clear search result
    cy.get('.btn-light').click()
   })
  it('search by arabic name',()=>{
    cy.get('.form-group > div > .text-right').clear()
    cy.get('.form-group > div > .text-right').type('الفردوس')
    cy.get('.btn-secondary').click()
    cy.get('.mat-paginator-range-label').should('have.text','1 – 1 of 1')
    cy.get('.mat-row > .cdk-column-arName').should('have.text',' الفردوس ')
    cy.get('.mat-row > .cdk-column-enName').should('have.text',' Paradise ')
    cy.get('.form-group > div > .text-right').clear()
     //Clear search result
     cy.get('.btn-light').click()
  })
  it('filter by project type',()=>{
   //Apartments project type
   cy.get('.c-btn').click({force:true})
  // cy.get('.c-btn').contains('Choose Project Type').dblclick()
  //  cy.reload();
  //  cy.get('angular2-multiselect[name="projectTypeId"]').click()
    cy.get('.lazyContainer > :nth-child(1)').click()
    cy.Search()
    //cy.get('.mat-row > .cdk-column-projectTypeName').contains('have.text','Apartments')
    cy.get('.mat-row > .cdk-column-projectTypeName').contains('Apartments')
    cy.Clear()
    //villas project type
    cy.get('.c-btn').click({force:true})
    cy.get('.lazyContainer > :nth-child(2)').click()
    cy.Search()
    cy.get('.mat-row > .cdk-column-projectTypeName').contains('Villas')
    cy.Clear()
    //offices project type
    cy.get('.c-btn').click({force:true})
    cy.get('.lazyContainer > :nth-child(3)').click()
    cy.Search()
    cy.get('.mat-row > .cdk-column-projectTypeName').contains('Offices')
    cy.Clear()
    //Duplex apartments project type
    cy.get('.c-btn').click({force:true})
    cy.get('.lazyContainer > :nth-child(4)').click()
    cy.Search()
    cy.get('.mat-row > .cdk-column-projectTypeName').contains('Duplex Apartment')
    cy.Clear()
  })

  it('filter by availability',()=>{
    //cy.get('.form-control').click({force:true})
    cy.get(".form-control").select(1)
    cy.Search()
    cy.get('.mat-row > .cdk-column-availabilityStatusId').contains('Yes')
    cy.Clear()
    cy.get(".form-control").select(2)
    cy.Search()
    cy.get('.mat-row > .cdk-column-availabilityStatusId').contains('No')
    cy.Clear()

  })})
  describe('project operations',()=>{

  describe('add project',()=>{
   
    it('add project with no values',()=>{
      cy.Add()

         cy.get('.ng-invalid.ng-star-inserted > .row > .col-12.text-right > .btn-dark').click()

      cy.get('div[class="invalid-feedback ng-star-inserted"]').children().should('have.length',4)
      cy.get(':nth-child(1) > :nth-child(2) > .invalid-feedback > .ng-star-inserted')
      .should('have.text','English name is required')
      cy.get(':nth-child(2) > :nth-child(2) > .invalid-feedback > .ng-star-inserted')
      .should('have.text','Arabic name is required')
      cy.get(':nth-child(3) > :nth-child(2) > .invalid-feedback > .ng-star-inserted')
      .should('have.text','Project type is required')
      cy.get('.justify-content-between > .invalid-feedback > .ng-star-inserted')      
      .should('have.text','Availability is required')
     cy.reload()
    })
    it('add project',()=>{
      cy.Add()
      cy.get('input[name="enName"]').type('test')
      cy.get('input[name="arName"]').type('تست')
      cy.get('.cdk-overlay-pane').within(()=>{
        cy.contains("Apartments1").click({force: true,multiple: true})
    })
     //cy.get('li[class="pure-checkbox"]').click()
     //cy.get('span[class="outer-circle]').find('input[name="availabilityStatusId"]').check()
     cy.get('input[value="1"]').check({force:true})
     cy.get('span[class="custom-checkbox"]').click()
     cy.get('button[type=submit]').click()
     cy.get('.message').should('have.text','Project Created Successfully')
     cy.reload()

     //cy.get('.ng-invalid.ng-star-inserted > .row > .col-12.text-right > .btn-dark').click()
      // cy.get('form[class="ng-pristine ng-invalid ng-star-inserted ng-touched"]').submit({force:true,multiple:true})
    })
    it('add existing project',()=>{
      cy.Add()
      cy.get('input[name="enName"]').type('test')
      cy.get('input[name="arName"]').type('تست')
      cy.get('.cdk-overlay-pane').within(()=>{
         cy.contains("Apartments1").click({force: true,multiple: true})
     })
      cy.get('input[value="1"]').check({force:true})
      cy.get('span[class="custom-checkbox"]').click()
      cy.get('button[type=submit]').click()
      cy.get('.message').should('be.visible')          
      cy.get('.message').should('have.text','Project Already Exist')
      cy.reload()

      // cy.get('#mat-dialog-1').within(()=>{
      //   cy.get('.btn-light').click()
      // })
  //  cy.get('button[class="btn btn-light"]').click()

     })

  })
  describe('edit project',()=>{
    it('canel without editing',()=>{
      cy.Clear()
      cy.get(':nth-child(3) > .form-group > div > .input-full-width').type('test')
      cy.Search()
      cy.wait(500)
      cy.get('.btn-info').click()
      cy.get('button[class="btn btn-light"]').click()
      cy.wait(500)
      cy.get('e-topup-project-add.ng-star-inserted > :nth-child(1) > .col-md-12').should('not.exist')          
      cy.reload()

    })
    it('save with no changes',()=>{
      cy.Clear()
      cy.get(':nth-child(3) > .form-group > div > .input-full-width').type('test')
      cy.Search()
      cy.wait(500)

      cy.get('.btn-info').click()
      cy.get('button[type=submit]').click()
      cy.get('.message').should('be.visible')          
      cy.get('.message').should('have.text','Project Updated Successfully')
      //cy.wait(10000)
      cy.reload()

    })
    it('edit with new values',()=>{
      cy.Clear()
      cy.get(':nth-child(3) > .form-group > div > .input-full-width').type('test')
      cy.Search()
      cy.wait(500)
      cy.get('.btn-info').click()
      cy.get('input[name="enName"]').clear()
      cy.get('input[name="enName"]').type('test')
      cy.get('input[name="arName"]').clear()
      cy.get('input[name="arName"]').type('تست')
      cy.get('.cdk-overlay-pane').within(()=>{
         cy.contains("Apartments1").dblclick({force: true,multiple: true})
     })
      cy.get('input[value="1"]').check({force:true})
      cy.get('span[class="custom-checkbox checked"]').click()
      cy.get('button[type=submit]').click()
      cy.get('.message').should('be.visible')          
      cy.get('.message').should('have.text','Project Updated Successfully')
      cy.reload()
    })
  })
  describe('delete project',()=>{
    it('abort delete',()=>{
      cy.Clear()
      cy.get(':nth-child(3) > .form-group > div > .input-full-width').type('test')
      cy.Search()
      cy.wait(500)
      cy.get('.btn-danger').click()
      cy.get('mat-dialog-container[role="dialog"]').should('be.visible')
      cy.get('div[class="col-12 mb-4"]').should('have.text',' Are you sure you want to delete this project ? ')
      cy.get('button[class="btn btn-light"]').click()
      cy.get('#mat-dialog-1').should('not.exist')
      cy.reload()
    })
    it('delete test project',()=>{
      cy.Clear()
      cy.get(':nth-child(3) > .form-group > div > .input-full-width').type('test')
      cy.Search()
      cy.wait(500)
      cy.get('.btn-danger').click()
      cy.get('mat-dialog-container[role="dialog"]').should('be.visible')
      cy.get('div[class="col-12 mb-4"]').should('have.text',' Are you sure you want to delete this project ? ')
      cy.get('button[class="btn btn-danger mx-2"]').click()
      cy.get('.message').should('be.visible')          
      cy.get('.message').should('have.text','Project Deleted Successfully')
      cy.reload()
    })
    

  })
})
})

})
after(()=>{
    cy.then(Cypress.session.clearCurrentSessionData)
   })