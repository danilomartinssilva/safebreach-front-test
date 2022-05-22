let timeValue = 5000;
describe('Yellolist', () => {
  it('List Users!', () => {
    cy.visit('http://localhost:3000/yellowlist');
    cy.wait(timeValue);

    cy.get('input').type('Rose 054 8');
    cy.get('#btnSubmitSearch').click();
    cy.get('.chakra-text');
    cy.get('input').type('{backspace}');
    cy.get('input').type('{backspace}');
    cy.get('input').type('{backspace}');
    cy.get('input').type('{backspace}');
    cy.get('input').type('{backspace}');
    cy.get('input').type('{backspace}');
    cy.get('input').type('{backspace}');
    cy.get('input').type('{backspace}');
    cy.get('input').type('{backspace}');
    cy.get('input').type('{backspace}');
    cy.get('input').type('{backspace}');
    cy.get('#btnSubmitSearch').click();
    cy.get('input').type('ximbustrufo');
  });
  it('Edit User', () => {
    cy.get('#updateContact').click();
    cy.wait(timeValue);
    for (let i = 0; i < 20; i++) {
      cy.get('#name').type('{backspace}');
    }
    cy.get('#buttonUpdateSubmit').click();
    cy.contains('Name is required');
    cy.get('#name').type('Danilo Martins');
    cy.get('#buttonUpdateSubmit').click();
    cy.wait(timeValue);
  });
  it('Edit User', () => {
    cy.get('input').type('Danilo');
    cy.get('#btnSubmitSearch').click();
    cy.wait(timeValue);
    cy.get('#removeContact').click();
    cy.wait(timeValue);

    cy.get('input').type('Danilo');
    cy.get('#btnSubmitSearch').click();
    cy.wait(timeValue);
    cy.contains('Danilo Martins').should('not.exist');
    cy.contains('Contacts Not Found');
  });
});
