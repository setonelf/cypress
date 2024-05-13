/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'
import { method } from 'bluebird'

describe('Should test at a frontend level', () => {

    after(()=>{
        cy.clearLocalStorage()
    })

    before(() => {
        
    })

    beforeEach(() => {
        buildEnv()
        cy.login('1234@email.com', 'senha errada')
        cy.get(loc.MENU.HOME).click()
    })

    it('Should create an account', () => {
        

        cy.route({
            method: 'POST',
            url: '/contas',
            response:{id:1, nome:"Adicao", visivel:true, usuario_id:1}
        }).as('contaAdicionada')


        cy.acessarMenuConta()

        cy.route({
            method: 'GET',
            url: '/contas',
            response:[
                {
                    id: 1,
                    nome: "Carteira",
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 2,
                    nome: "Conta",
                    visivel: true,
                    usuario_id: 1
                },
                {
                    id: 3,
                    nome: "Adicao",
                    visivel: true,
                    usuario_id: 1
                },
                
            ]
        }).as('contaSalva')

        cy.inserirConta('Conta de teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Should update an account', () => { 
        cy.route({
            method: 'PUT',
            url: '/contas/**',
            response: {id:1, nome:"Conta Alterada", visivel:true, usuario_id:1}
        }).as('contaAlterada')
        
        cy.acessarMenuConta()

        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Carteira')).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Should not create an account with same name', () => {
        cy.route({
            method: 'POST',
            url: '/contas',
            response:{"error":"Já existe um conta com esse nome!"},
            status: 400
        }).as('contaAdicionadaMesmoNome')
        
        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it.only('Should create a transaction', () => {
        cy.route({
            method: 'POST',
            url: '/transacoes',
            response: {
                "id": 1987495,
                "descricao": "sasdas",
                "envolvido": "asd",
                "observacao": null,
                "tipo": "REC",
                "data_transacao": "2024-05-13T03:00:00.000Z",
                "data_pagamento": "2024-05-13T03:00:00.000Z",
                "valor": "123.00",
                "status": false,
                "conta_id": 2115968,
                "usuario_id": 48029,
                "transferencia_id": null,
                "parcelamento_id": null
            }
        })

        cy.get(loc.MENU.MOVIMENTACAO).click();
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta')
        cy.get(loc.MOVIMENTACAO.STATUS).click()

        cy.route({
            method: 'GET',
            url: '/extrato/**',
            response: [
                {
                    "conta": "Conta para movimentacoes",
                    "id": 1987496,
                    "descricao": "Movimentacao para exclusao",
                    "envolvido": "AAA",
                    "observacao": null,
                    "tipo": "DESP",
                    "data_transacao": "2024-05-13T03:00:00.000Z",
                    "data_pagamento": "2024-05-13T03:00:00.000Z",
                    "valor": "-1500.00",
                    "status": true,
                    "conta_id": 2119461,
                    "usuario_id": 48029,
                    "transferencia_id": null,
                    "parcelamento_id": null
                },
                {
                    "conta": "Conta com movimentacao",
                    "id": 1987497,
                    "descricao": "Movimentacao de conta",
                    "envolvido": "BBB",
                    "observacao": null,
                    "tipo": "DESP",
                    "data_transacao": "2024-05-13T03:00:00.000Z",
                    "data_pagamento": "2024-05-13T03:00:00.000Z",
                    "valor": "-1500.00",
                    "status": true,
                    "conta_id": 2119462,
                    "usuario_id": 48029,
                    "transferencia_id": null,
                    "parcelamento_id": null
                },
                {
                    "conta": "Conta para saldo",
                    "id": 1987498,
                    "descricao": "Movimentacao 1, calculo saldo",
                    "envolvido": "CCC",
                    "observacao": null,
                    "tipo": "REC",
                    "data_transacao": "2024-05-13T03:00:00.000Z",
                    "data_pagamento": "2024-05-13T03:00:00.000Z",
                    "valor": "3500.00",
                    "status": false,
                    "conta_id": 2119463,
                    "usuario_id": 48029,
                    "transferencia_id": null,
                    "parcelamento_id": null
                },
                {
                    "conta": "Conta para saldo",
                    "id": 1987499,
                    "descricao": "Movimentacao 2, calculo saldo",
                    "envolvido": "DDD",
                    "observacao": null,
                    "tipo": "DESP",
                    "data_transacao": "2024-05-13T03:00:00.000Z",
                    "data_pagamento": "2024-05-13T03:00:00.000Z",
                    "valor": "-1000.00",
                    "status": true,
                    "conta_id": 2119463,
                    "usuario_id": 48029,
                    "transferencia_id": null,
                    "parcelamento_id": null
                },
                {
                    "conta": "Conta para saldo",
                    "id": 1987500,
                    "descricao": "Movimentacao 3, calculo saldo",
                    "envolvido": "EEE",
                    "observacao": null,
                    "tipo": "REC",
                    "data_transacao": "2024-05-13T03:00:00.000Z",
                    "data_pagamento": "2024-05-13T03:00:00.000Z",
                    "valor": "1534.00",
                    "status": true,
                    "conta_id": 2119463,
                    "usuario_id": 48029,
                    "transferencia_id": null,
                    "parcelamento_id": null
                },
                {
                    "conta": "Conta para extrato",
                    "id": 1987501,
                    "descricao": "Movimentacao para extrato",
                    "envolvido": "FFF",
                    "observacao": null,
                    "tipo": "DESP",
                    "data_transacao": "2024-05-13T03:00:00.000Z",
                    "data_pagamento": "2024-05-13T03:00:00.000Z",
                    "valor": "-220.00",
                    "status": true,
                    "conta_id": 2119464,
                    "usuario_id": 48029,
                    "transferencia_id": null,
                    "parcelamento_id": null
                },
                {
                    "conta": "Conta para extrato",
                    "id": 123,
                    "descricao": "Desc",
                    "envolvido": "FFF",
                    "observacao": null,
                    "tipo": "DESP",
                    "data_transacao": "2024-05-13T03:00:00.000Z",
                    "data_pagamento": "2024-05-13T03:00:00.000Z",
                    "valor": "123.00",
                    "status": true,
                    "conta_id": 2119464,
                    "usuario_id": 48029,
                    "transferencia_id": null,
                    "parcelamento_id": null
                }
            ]
        })

        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
        cy.get(loc.EXTRATO.LINHAS).should('have.length', 7)
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', '123')).should('exist')
    })

    it('Should get balance', () => {
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00')

        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click()
        // cy.wait(1000)
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')

        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00')
    })

    it('Should remove a transaction', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_REMOVER_ELEMENTO('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })
})

