## Description
I tracked my own personal income and expenses in a google sheet for years and the only drawback was the user interface. I would only ever update it from my computer because editing a google sheet on a phone was more trouble than it was worth so I had to wait until I got home each day and try to remember my expenses or save my receipts. This wasn't impossible and even turned out to be a good practice, but I thought it would be fun to recreate the google sheet's functionality in a progressive web app that I could run on my phone.  The front end is a React PWA hosted on Firebase.  The back end is a Rails API hosted on Heroku.

## Try It Out
https://sumfinance-b89c6.firebaseapp.com/

## Things to do:
- [ ]Add extra calculations to a dashboard-like page
- [-]<del>-Table filterable by month (instead of just date)</del> _decided not to do this because you can simply type in the year and month in the search bar and it will filter. If I wanted to make it look better or more obvious I could add a dropdown for month and day but that seems overcomplicated_
- [ ]Sorting table by income and expense (Currently table is only expenses)
- [ ]Edit entry
- [ ]Edit Category
- [ ]Handle data by year, switch between years that user is viewing
- [ ]Untracked categories
- [ ]Delete category (asks to recategorize or delete existing entries)
- [ ]Add "are you sure?" to delete buttons
- [ ]Forward backward buttons/scrolling for charts
- [ ]Improve charts in general, they are horrible
- [ ]Percent of income saved, spent, donated?
- [X]Sum by filtered table results
- [ ]Add tests
- [ ]Recurring payments
- [ ]Savings and goals
