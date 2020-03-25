// https://docs.cypress.io/api/introduction/api.html

describe('Create Client Foo', () => {
  it('Visits the app root url', () => {
      cy.visit('http://localhost:8080/')
      cy.get('.btn.newclient').click()
      cy.get('input.inpuntnewtask.name').type('Foo')
      cy.get('input.inpuntnewtask.amount').clear().type('23').type('{enter}')
  })
})

describe('Create Play and Stop Bar', () => {
    it('Visits the app root url', () => {
        cy.visit('http://localhost:8080/')
        cy.get('.navitem.btn').first().click()
        cy.get('input.inpuntnewtask').type('Bar').type('{enter}')
        cy.get('.player.btn').first().click()
        cy.wait(3000)
        cy.get('.player.btn.stop').first().click()
    })
})
describe('Modify hourly, reset hourly', () => {
    it('Visits the app root url', () => {
        cy.visit('http://localhost:8080/')
        cy.get('.navitem.btn').first().click()
        cy.get('.ratechanger.btn').first().click()
        cy.get('.ratechanger input').clear().type('329').type('{enter}')
        cy.wait(700)
        cy.get('.ratechanger.btn').first().click()
        cy.get('.ratechanger .cycancel').click()
    })
})

describe('Open, close history, create comment, show comment', () => {
    it('Visits the app root url', () => {
        cy.visit('http://localhost:8080/')
        cy.get('.navitem.btn').first().click()
        cy.get('.openhistory.btn').first().click()
        cy.get('.openhistory.btn.cyfirst').click()
        cy.get('#note textarea').click().clear().type('Testing with Cypress Testing with Cypress Testing with Cypress Testing with Cypress ')
        cy.get('.btne.push').click()
        cy.get('.openhistory.btn').first().click()
        cy.get('.openhistory.btn.cyfirst').click()
    })
})

describe('Delete Task', () => {
    it('Visits the app root url', () => {
        cy.visit('http://localhost:8080/')
        cy.get('.navitem.btn').first().click()
        cy.get('.openhistory.btn.cydelete').first().click()
        cy.get('button.vue-dialog-button').eq(1).click()
    })
})


describe('Delete Database', () => {
    it('Visits the app root url', () => {
        cy.visit('http://localhost:8080/')
        cy.get('.btn.conf').first().click()
        cy.get('.btn.expimp').eq(2).click()
        cy.get('button.vue-dialog-button').eq(1).click()

    })
})