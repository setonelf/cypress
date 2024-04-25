//// Apenas exemplos do uso do intercept

cy.intercept({
    method: '',
    url: ''
    },
    { param1: valor1, param2: valor2
    }
).as('Alias')

///Caso precise utilizar Array

cy.intercept({
    method: '',
    url: ''
    },
    [
        {param1: valor1, param2: valor2},
        {paramA: valorA, paramB: valorB},
        {paramZ: valorZ, paramX: valorX}
    ]
).as('Alias')


///Quando a resposta tiver mais de um parametro envia-se 2 objetos
cy.intercept({
    method: '',
    url: ''
    },{
        statusCode: 400,
        body: {
            "chave" : "valor"
        }
    }
).as('Alias')