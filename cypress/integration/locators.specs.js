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

    it.only('using Xpath', ()=>{
        cy.xpath('//input[contains(@onclick, \'Francisco\')]')
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/following-sibling::td/input[@type='text']")
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/..//input[@type='text']")
        cy.xpath("//td[contains(., 'Usuario A')]/following-sibling::td[contains(., 'Mestrado')]/..//input[@type='text']").type("Funciona")
    })
}) 