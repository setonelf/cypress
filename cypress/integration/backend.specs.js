/// <reference types="cypress"/>

const { method } = require("cypress/types/bluebird")

describe('Work with alerts', ()=>{
    let token

    before(()=>{
        cy.getToken('1234@email.com', '1234')
            .then(tkn =>{
                token = tkn
            })
    })

    beforeEach(() => {
        cy.resetRest()
    })

    it('Should create an account', ()=>{
       
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization:`JWT ${token}` },
            body:{
                nome: 'Conta via rest'
            }
        }).as('response')
            

        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })
       
    })

    it('Should update an account', ()=>{
        cy.getContaByName('Conta para alterar')    
        .then(contaId=>{
            cy.request({
                url: `/contas/${contaId}`,
                method: "PUT",
                headers: { Authorization:`JWT ${token}` },
                body: {
                    nome: 'conta alterada via rest'
                }
            }).as('response')
        })
            cy.get('@response').its('status').should('be.equal', 200)
        })

    it('Should not create an account with the same name', ()=>{
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization:`JWT ${token}` },
            body:{
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('response')
            

        cy.get('@response').then(res =>{
            console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it('Should create an transaction', ()=>{
        cy.getContaByName('Conta para movimentacoes')
        .then(contaId => {
            cy.request({
                method: 'POST',
                url: '/transacoes',
                headers: { Authorization:`JWT ${token}` },
                body: {
                    conta_id: contaId,
                    data_pagamento: Cypress.moment().add({days:1}).format('DD/MM/2024'),
                    data_transacao: Cypress.moment().format('DD/MM/2024'),
                    descricao: "desc",
                    envolvido: "inter",
                    status: true,
                    tipo: "REC",
                    valor: "123",
                }
            })   
        }).as('response')
        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('body.id').should('exist')
    })

    it.only('Should get balance', ()=>{
        Cy.request({
            url: '/saldo',
            method: 'GET',
            headers: { Authorization:`JWT ${token}` },          
        }).then(res =>{
            console.log(res)
        })
    })

    it('Should remove a transaction', ()=>{

    })   
})