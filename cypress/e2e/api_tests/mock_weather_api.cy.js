
describe('Mocking API which is down',()=>{
    it("Mocking weather API",()=>{
        cy.visit("https://api.trello.com");
        cy.intercept({
            url: 'https://api.trello.com',
            path: '/posts*',
            method: 'GET'
        }).as('posts');
        cy.wait('@posts').then((inter)=>{
            cy.log(JSON.stringify(inter));
        })
    })

    it("Mocking weather API",()=>{
        cy.visit("https://api.trello.com");
        cy.intercept('GET','/posts',{fixture: 'user_details.json'}).as('posts');
        cy.wait('@posts')
    })
})