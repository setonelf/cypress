/// <reference types="cypress"/>

describe('elements', ()=>{

    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
            cy.reload()
    })
    it('Usando Jquery Selector',()=>{
        cy.get('[onclick*="Francisco"]').click()
    })
}) 