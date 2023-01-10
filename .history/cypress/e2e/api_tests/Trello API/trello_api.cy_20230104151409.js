/// <reference types = "Cypress" />
describe('Test for creating an board',()=>{
    const baseURL = "https://api.trello.com";
    const apiKey = "e812196d03c6175edf6b0cb8c219361c";
    const token_val = "2cfe8b515f2f61c03d177068d26ea7ce843a3a12bddaea333cd2daebb034015f";
    let boardName = "Test1";
    function getBoardName(){
        if(boardName)
        boardName = "MyBoard"+1
    }
    it('Create a Board', () => {
        cy.request({
            method: 'POST',
            url: baseURL+"/1/boards/?name="+boardName+"&key="+apiKey+"&token="+token_val+"&defaultLists=false",
        }).then((res)=>{
            expect(res.status).to.eql(200)
        })
    });
})