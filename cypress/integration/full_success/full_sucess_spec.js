// This was very helpful when creating fixtures:
// https://chipcullen.com/how-to-create-and-use-fixtures-in-cypress-tests/

describe('full success', function() {
    it('creates a new user', function() {
      // Set up stub
      cy.server();
      cy.route({
        method: 'POST',
        url: 'https://sumfinance-staging.herokuapp.com/api/v1/users',
        response: "fixture:full_success_create_new_user.json"
      })

      // Test with stubbed response and alert
      let stub_alert = cy.stub()
      cy.visit_with_stub('/signup', stub_alert)

      cy.get('[name="username"]').type('test1')
      cy.get('[name="password"]').type('test1')
      cy.get('[name="email"]').type('test1@mail.com{enter}')
      cy.wait(300) // this is stupid but it is the only thing that works
        .then(() => {
          expect(stub_alert).to.be.calledWith('Success! Please log in.')
        })
      cy.get('.button').contains('Login')
    })
    
    it('logs in and creates new category', function() {
      let stub = cy.stub()
      cy.visit_with_stub('/', stub)
      cy.contains('Login').click()
      cy.url().should('include', '/login')
      cy.get('input[name="username"]').type('test1')
      cy.get('input[name="password"]').type(`test1{enter}`)
      cy.url().should('include', 'dashboard')
      cy.contains('More').should('be.visible')
      cy.contains('New Category?').should('be.visible')

      // Adds a new category and entry
      cy.get('[type="checkbox"]')
        .check().should('be.checked')
      cy.get('[name="category_name"]').type('New One')
      cy.get('[name="amount"]').type('100')
      cy.get('[name="notes"]').type('This is a new entry')
      cy.get('.button').contains('Submit').click()
      cy.wait(300) // this is stupid but it is the only thing that works
        .then(() => {
          expect(stub).to.be.calledWith('Success!')
        })
    })

    it('adds new entry to existing category', function() {
        let stub = cy.stub()
        cy.login()
        cy.visit_with_stub('/dashboard/form', stub)
        cy.get('[name="category_name"]').select('New One')
        cy.get('[name="amount"]').type('150')
        cy.get('[name="notes"]').type('Another new entry')
        cy.get('.button').contains('Submit').click()
        cy.wait(300) // this is stupid but it is the only thing that works
          .then(() => {
            expect(stub).to.be.calledWith('Success!')
          })
    })

    it('adds new income entry and category', function() {
        let stub = cy.stub()
        cy.login()
        cy.visit_with_stub('/dashboard/form', stub)
        cy.get('[name="newcategory"]').check().should('be.checked')
        cy.get('[name="income"]').check().should('be.checked')
        cy.get('[name="category_name"]').type('New Income')
        cy.get('[name="date"]').type('2018-01-01')
        cy.get('[name="amount"]').type('150')
        cy.get('[name="notes"]').type('Another new entry')
        cy.get('.button').contains('Submit').click()
        cy.wait(300) // this is stupid but it is the only thing that works
          .then(() => {
            expect(stub).to.be.calledWith('Success!')
          })
    })

    it('checks charts', function() {
        cy.login()
        cy.visit('/dashboard/form')
        // Check Charts
        cy.get('[href="/dashboard/charts"]').click()
        cy.get('h3').contains('New One: $250')
        cy.get('h3').contains('Profit/Loss: -$250')
        cy.get('[name="chart"]').select('2019')
        cy.get('h3').contains('Total Expenses: $250')
        cy.get('h3').contains('Total Income: $0.00')

        // Change Year View
        cy.get('.more').click()
        cy.get('[href="/dashboard/settings"]').click()
        cy.get('[name="year_view"]').select('2018')
        cy.get('.year_view').contains('Submit').click()

        // Go back and check charts
        cy.get('[href="/dashboard/charts"]').click()
        cy.get('div').contains('No Expenses')

        // Set year view back to 2019
        cy.get('.more').click()
        cy.get('[href="/dashboard/settings"]').click()
        cy.get('[name="year_view"]').select('2019')
        cy.get('.year_view').contains('Submit').click()
    })

    it('updates entry', function() {
        cy.login()
        let stub = cy.stub()
        cy.visit_with_stub('/dashboard/form', stub)

        // Navigates to entries and updates entry
        cy.get('[href="/dashboard/entries"]').click()
        cy.get('div').contains('Another new entry').click()
        cy.get('.update').click()
        cy.get('[name="amount"]').clear().type('150')
        cy.get('[name="notes"]').clear().type('Updated entry')
        cy.get('.button').contains('Submit').click()
        cy.wait(300) // this is stupid but it is the only thing that works
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('success!')
            })
    })

    it('deletes entry', function() {
        // stub window alerts
        const stub = cy.stub()  
        cy.on('window:alert', stub)

        cy.login()
        cy.visit('/dashboard/form')
        // Navigates to entries and deletes entry
        cy.get('[href="/dashboard/entries"]').click()
        cy.get('div').contains('Updated entry').click()
        cy.get('.delete').click()
        cy.get('.delete').click()
        cy.get('div').contains('Updated entry').should('not.exist');
    })

    it('deletes category', function() {
        cy.login()
        cy.visit('/dashboard/form')
        // Navigates to settings and deletes Category
        cy.get('.more').click()
        cy.get('[href="/dashboard/settings"]').click()
        cy.get('[name="delete_category"]').select('New One')
        cy.get('.delete_category').contains('Delete').click()
        cy.get('.delete').contains('Delete').click()
    })
})