

describe('My First Test', () => {
  it('Does not do much!', () => {
    
    cy.visit('http://localhost:3000/yellowlist')
    cy.get('input').type('D 02')
    cy.get('button').click()
    cy.get('input').type('{backspace}')
    cy.get('input').type('R 02 47')
    cy.get('button').click()
    cy.get('input').type('{backspace}')
    cy.get('input').type('{backspace}')
    cy.get('input').type('{backspace}')
    cy.get('input').type('{backspace}')
    cy.get('input').type('{backspace}')
    cy.get('input').type('{backspace}')
    cy.get('input').type('{backspace}')
    cy.get('input').type('{backspace}')
    cy.get('input').type('{backspace}')
    cy.get('input').type('{backspace}')    
    cy.get('button').click()
  })
})