/// <reference types="cypress"/>

describe('elements', ()=>{

    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
            cy.reload()
    })

    it('Deve preencher o campo de texto', ()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')
            cy.wrap(body).find('#tfield')
                .type('Funciona?')
                .should('have.value', 'Funciona?')

            cy.on('window:alert', msg =>{
                expect(msg).to.be.equal('Alert Simples')

                
            })

            cy.wrap(body).find('#otherButton').click()
        })
    })

    it.only('Deve testar frame diretamente', ()=>{
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })
})