/// <reference types="cypress"/>

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

    it.only('Should update an account', ()=>{
        cy.request({
            method: 'GET',
            url: "/contas",
            headers: { Authorization:`JWT ${token}` },
            qs:{
                nome: 'Conta para alterar'
            }            
            
        }).then(res=>{
            console.log(res)
            cy.request({
                url: `https://barrigarest.wcaquino.me/contas/${res.body[0].id }`,
                method: "PUT",
                headers: { Authorization:`JWT ${token}` },
                body: {
                    nome: 'conta alterada via rest'
                }
            }).as('response')
    
            cy.get('@response').its('status').should('be.equal', 200)
        })


       
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