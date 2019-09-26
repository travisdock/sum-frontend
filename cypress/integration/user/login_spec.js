describe('Login Tests', function() {
    it('logs recieves error for incorrect username/password', function() {
      const stub = cy.stub()  
      cy.on('window:alert', stub)

      cy.visit('/')
      cy.contains('Login').click()
      cy.url().should('include', '/login')
      cy.get('input[name="username"]').type('fakenotreal')
      cy.get('input[name="password"]').type('fakenotreal{enter}')
      cy.wait(200) // this is stupid but it is the only thing that works
        .then(() => {
          expect(stub.getCall(0)).to.be.calledWith('Username or Password Invalid')
        })
    })

})