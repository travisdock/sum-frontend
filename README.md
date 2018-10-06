<p align="center">
<img src="https://user-images.githubusercontent.com/36681963/46574152-56d1ac00-c96d-11e8-90ca-54e9047a0620.png" alt="javascript">
<img src="https://user-images.githubusercontent.com/36681963/46574153-5a653300-c96d-11e8-92be-113930d0a4e4.png" alt="react">
<img src="https://user-images.githubusercontent.com/36681963/46574151-520cf800-c96d-11e8-9753-3948f3f4508a.jpg" alt="redux">
</p>

## Description
I tracked my own personal income and expenses in a google sheet for years and the only drawback was the user interface. I would only ever update it from my computer because editing a google sheet on a phone was more trouble than it was worth so I had to wait until I got home each day and try to remember my expenses or save my receipts. This wasn't impossible and even turned out to be a good practice, but I thought it would be fun to recreate the google sheet's functionality in a progressive web app that I could run on my phone.  The front end is a React PWA hosted on Firebase.  The back end is a Rails API hosted on Heroku.

## Try It Out
<a href="https://sumfinance-b89c6.firebaseapp.com/" target="_blank">Sum Finance Firebase App</a> 


## Things to do:
- [ ]Add tests
- [ ]Color code stats for readability?
- [ ]Sorting table by income and expense
- [ ]Add google sheets connection for uploading data
- [ ]Add ability to edit entry
- [ ]Add ability to edit Category
- [ ]Add ability to view app by year, entire app changes when year is changed somehow
- [ ]Add ability to delete category (asks to recategorize or delete existing entries)
- [ ]Add pwa icon image
- [ ]Add "are you sure?" to delete buttons
- [ ]Test and improve accessibility
- [ ]Add separate components for mobile and desktop viewing
- [ ]Change charts to D3?
- [ ]Percent of income saved, spent, donated?
- [ ]Recurring payments
- [ ]Savings and goals
- [ ]React Native Version?
- [X]Sum by filtered table results (added 9/16/18)
- [X]Fix table to add notes column when mobile switches to landscape (added 9/23/18)
- [X]Setup dev environment for enhanced testing of frontend and backend (added 9/24/18)
- [X]Fix bug: when only one entry is available and it is an income the charts page breaks (fixed 9/27/18)
  - [X]Add staging environment to test new backend on(added 9/27/18)
- [X]Add select box to charts page instead of "next" button (added 9/28/18)
  - [X]Add PL chart to the select instead of "change chart" button (added 9/29/18)
- [X]Add stats to charts page (added 10/1/18)
- [X]Add untracked categories (added 10/3/18)