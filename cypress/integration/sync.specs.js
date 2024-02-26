/// <reference types="cypress"/>

describe('Esperas...', ()=>{
   before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

   beforeEach(() => {
    cy.reload()
   })

   it('Deve aguardar elemento estar disponível', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo').should('exist')
    cy.get('#novoCampo').type('funciona')
   })

   it('Deve fazer retrys', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo')
        .should('exist')
        .type('funciona')
   })

   it('Uso do find', ()=>{
    cy.get('#buttonList').click()
    cy.get('#lista li')
        .find('span')
        .should('contain', 'Item 1')
    cy.get('#lista li span')
        .should('contain', 'Item 2')
   })

   it('Teste com uso do timeout e wait', ()=>{
        cy.get('#buttonDelay').click()
        //cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo', {timeout: 5000}).should('exist')
        //caso deseja mudar o timeout para toda aplicação, ir no arquivo cypress.json e
        //adicionar o argumento "defaultCommandTimeout: 1000", onde o 1000 é o tempo em milisegundos
        cy.get('#buttonListDOM').click()
        //cy.wait(5000)
        cy.get('#lista li span')
            .should('have.length', 1)
        cy.get('#lista li span')
            .should('have.length', 2)
            //.should('contain', 'Item 2')

        
   })

   
    
    
})