/// <reference types="cypress"/>

describe('elements', ()=>{

    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
            cy.reload()
    })

    it('Cadastro', ()=>{
        const stub = cy.stub().as('alerta')

        //Clica em cadastrar
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click()
            .then(()=>{
                expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
            })
        
        // Preenche o nome e clica em cadastrar novamente
        cy.get('#formNome').type("Thiago")
        cy.get('#formCadastrar').click()
            .then(()=>{
                expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
            })
        
        //Preenche o sobrenome e clica em cadastrar novamente
        cy.get('[data-cy=dataSobrenome]').type('Freitas')
        cy.get('#formCadastrar').click()
            .then(()=>{
                expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
            })

        //Clica no sexo, clica em cadastrar e valida se cadastro foi realizado
        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    })

})