// https://docs.cypress.io/api/introduction/api.html

describe('Create Client Foo', () => {
  it('Visits the app root url', () => {
      cy.visit('http://localhost:8080/')
      cy.get('.btn.newclient').click()
      cy.get('input.inpuntnewtask.name').type('Foo')
      cy.get('input.inpuntnewtask.amount').clear().type('23').type('{enter}');
      cy.get('.navitem.btn').first().click()
  })
})
