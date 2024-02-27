/// <reference types="cypress"/>

describe('elements', ()=>{

    before(()=>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach(() => {
            cy.reload()
    })

    it('combo', ()=>{
        cy.get('[data-test=dataEscolaridade')
            .select('2o grau completo')
            .should('have.value', '2graucomp')

        cy.get('[data-test=dataEscolaridade')
            .select('1graucomp')
            .should('have.value','1graucomp')

        cy.get('[data-test=dataEscolaridade] option')
            .should('have.length', 8)
        
        cy.get('[data-test=dataEscolaridade] option')
            .then($arr => {
                const values = []
                $arr.each(function(){
                    values.push(this.innerHTML)
                })
                expect(values).to.include.members(["Superior", "Mestrado"])
            })

    })

    it.only('Combo multiplo', ()=> {
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'Corrida', 'nada'])
        
        //cy.get('[data-testid=dataEsportes]').should('have.value', ['natacao', 'Corrida', 'nada'])

        cy.get('[data-testid=dataEsportes]').then($el =>{
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
            expect($el.val()).to.have.length(3)
        })
        
        cy.get('[data-testid=dataEsportes]').invoke('val').should('eql', ['natacao', 'Corrida', 'nada'] )

    })
})