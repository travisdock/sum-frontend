## Description
I tracked my own personal income and expenses in a google sheet for years and the only drawback was the user interface. I would only ever update it from my computer because editing a google sheet on a phone was more trouble than it was worth so I had to wait until I got home each day and try to remember my expenses or save my receipts. This wasn't impossible and even turned out to be a good practice, but I thought it would be fun to recreate the google sheet's functionality in a progressive web app that I could run on my phone.  The front end is a React PWA hosted on Firebase.  The back end is a Rails API hosted on Heroku.

## Try It Out
https://sumfinance-b89c6.firebaseapp.com/

## Things to do:
- [ ]Fix bug: when only one entry is available and it is an income the charts page breaks
- [ ]Add select box to charts page instead of "next button"
- [ ]Add stats to charts page
- [ ]Sorting table by income and expense
- [ ]Add ability to edit entry
- [ ]Add ability to edit Category
- [ ]Add ability to view app by year, entire app changes when year is changed somehow
- [ ]Add ability to delete category (asks to recategorize or delete existing entries)
- [ ]Add tests
- [ ]Add "are you sure?" to delete buttons
- [ ]Add separate components for mobile and desktop viewing
- [ ]Improve charts in general, they are horrible
- [ ]Percent of income saved, spent, donated?
- [ ]Recurring payments
- [ ]Savings and goals
- [ ]Untracked categories?
- [X]Sum by filtered table results (added 9/16/18)
- [X]Fix table to add notes column when mobile switches to landscape (added 9/23/18)
- [X]Setup dev environment for enhanced testing of frontend and backend (added 9/24/18)
