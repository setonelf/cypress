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

    it.only('Indo ao futuro', ()=>{
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '1709')
        cy.get('#resultado > span').invoke('text').should('gt', 1709772805820)

        cy.clock()
        // cy.get('#buttonTimePassed').click()
        // cy.get('#resultado > span').invoke('text').should('lte', 0)
        // cy.wait(1000)
        // cy.get('#buttonTimePassed').click()
        // cy.get('#resultado > span').invoke('text').should('gte', 1000)

        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', 1000)
    })
})