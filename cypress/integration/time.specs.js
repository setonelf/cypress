/// <reference types="cypress"/>

describe('Work with alerts', ()=>{

    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Voltando ao passado', ()=>{
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '06/03/2024')

        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '31/12/1969')

        const dt = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012')

    })
})