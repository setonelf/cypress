/// <reference types="cypress"/>

describe('Esperas...', ()=>{
    before(()=>{
         cy.visit('https://wcaquino.me/cypress/componentes.html')
     })
 
    beforeEach(() => {
     cy.reload()
    })

    it.only('Getting the page title', ()=> {
        cy.title().should('be.equal', 'Campo de treinamento')
        cy.title().should('contain', 'Campo')
        
        cy.title()
            .should('be.equal', 'Campo de treinamento')
            .and('contain', 'Campo')

        cy.title().debug()
    })

})
    