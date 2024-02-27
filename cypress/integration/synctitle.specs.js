/// <reference types="cypress"/>

describe('Esperas...', ()=>{
    before(()=>{
         cy.visit('https://wcaquino.me/cypress/componentes.html')
     })
 
    beforeEach(() => {
     cy.reload()
    })

    it.only('Getting the page title', ()=> {
        /* cy.title().should('be.equal', 'Campo de treinamento')
        cy.title().should('contain', 'Campo')
        
        cy.title()
            .should('be.equal', 'Campo de treinamento')
            .and('contain', 'Campo') */

        let syncTitle

        cy.title().then(title =>{
            console.log(title)
            
            cy.get('#formNome').type(title)

            syncTitle = title
        })

        cy.get('[data-cy=dataSobrenome]').then($el =>{
            $el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
        })
    })

})
    