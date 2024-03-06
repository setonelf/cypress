/// <reference types="cypress"/>

describe('Work with alerts', ()=>{

    beforeEach(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']

    foods.forEach(food =>{
        it(`Cadastro com comida '${food}'`, ()=>{
            cy.get('#formNome').type('Usuario')
            cy.get('[data-cy=dataSobrenome]').type('Qualquer')
            cy.get(`[name=formSexo][value=F]`).click()
            cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
            cy.get('[data-test=dataEscolaridade]').select('Doutorado')
            cy.get('[data-testid=dataEsportes]').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        })
    })

    it.only('Deve selecionar todos usando o Each', ()=>{
        cy.get('#formNome').type('Usuario')
            cy.get('[data-cy=dataSobrenome]').type('Qualquer')
            cy.get(`[name=formSexo][value=F]`).click()

            cy.get(`[name=formComidaFavorita]`).each($el =>{
                if($el.val() != 'vegetariano')
                cy.wrap($el).click()
            })
            
            cy.get('[data-test=dataEscolaridade]').select('Doutorado')
            cy.get('[data-testid=dataEsportes]').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
            // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    })

    
})