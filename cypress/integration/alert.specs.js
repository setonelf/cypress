/// <reference types="cypress"/>

describe('Work with alerts', ()=>{

    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
            cy.reload()
    })

    it('Alert', ()=>{
        cy.get('#alert').click()
        cy.on('window:alert', msg =>{
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')
        })
    })

    it('Alert com mock', ()=>{
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(()=> {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })

    it('Alert Confirm', ()=>{
        
        cy.on('window:confirm', msg =>{
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
        })
        cy.on('window:alert', msg =>{
            console.log(msg)
            expect(msg).to.be.equal('Confirmado')
        })
        cy.get('#confirm').click()
    })

    it.only('Alert Deny', ()=>{
        
        cy.on('window:confirm', msg =>{
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
            // para apertar no botao de cancelar do confirm e necessario fazer um return false
            return false
        })
        cy.on('window:alert', msg =>{
            console.log(msg)
            expect(msg).to.be.equal('Negado')
        })
        cy.get('#confirm').click()
    })
})