/// <reference types="cypress"/>

describe('Work with alerts', ()=>{

    before(()=>{
        
    })

    beforeEach(() => {
            
    })

    it('Should create an account', ()=>{
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email:'1234@email.com',
                redirecionar: false,
                senha: '1234'
            }
        }).its('body.token').should('not.be.empty')
        .then(token =>{
            cy.request({
                url: 'https://barrigarest.wcaquino.me/contas',
                method: 'POST',
                headers: { Authorization:`JWT ${token}` },
                body:{
                    nome: 'Conta via rest'
                }
            }).as('response')
        })

        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })
       
    })

    it('Should update an account', ()=>{

    })

    it('Should not create an account with the same name', ()=>{

    })

    it('Should create an transaction', ()=>{

    })

    it('Should get balance', ()=>{

    })

    it('Should remove a transaction', ()=>{

    })

})