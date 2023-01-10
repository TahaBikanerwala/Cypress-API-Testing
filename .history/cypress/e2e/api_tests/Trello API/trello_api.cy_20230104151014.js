/// <reference types = "Cypress" />
describe('Test for creating an board',()=>{
    const baseURL = "https://api.trello.com";
    const apiKey = "";
    const token_val = "";
    let boardName = ""
    it('Create a Board', () => {
        cy.request({
            method: 'POST',
            url: baseURL+"/1/boards/?name="+boardName+"&key="+apiKey+"&token="+token_val+"&defaultLists=false",
            
        })
    });
})