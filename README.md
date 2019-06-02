<p align="center">
  <a href="https://travis-ci.com/travisdock/sum-frontend"><img src="https://travis-ci.com/travisdock/sum-frontend.svg?branch=production" alt="Production Build Status"></a>
  <a href="href='https://coveralls.io/github/travisdock/sum-frontend?branch=staging"><img src="https://img.shields.io/coveralls/travisdock/sum-frontend/production.svg?style=plastic&label=Coveralls+Coverage" alt="Coveralls Test Coverage"></a>
</p>

<p align="center">
<img src="https://user-images.githubusercontent.com/36681963/47616844-57ef8800-da98-11e8-8504-89b765c4beaa.png" alt="javascript" title="Written in Javascript">
<img src="https://user-images.githubusercontent.com/36681963/46574153-5a653300-c96d-11e8-92be-113930d0a4e4.png" alt="react" title="Built with React">
<img src="https://user-images.githubusercontent.com/36681963/47617023-27a8e900-da9a-11e8-945e-5c409a0bf4a6.png" alt="jest" title="Tested with Jest">
<img src="https://user-images.githubusercontent.com/36681963/46639150-84b41d80-cb32-11e8-88c5-a7903ffad743.jpg" alt="travisCI" title="Continuous Integration with Travis CI">
<img src="https://user-images.githubusercontent.com/36681963/46583298-b63dc380-ca22-11e8-8d35-e77738726561.jpg" alt="firebase" title="Deployed using Firebase">
</p>

## Description
This is a learning and working project, by which I mean I actually use it and I also use it to learn. I built it to track my personal finances and I use it as such, but I also use it whenever I want to learn something. I am constantly tweaking it and I hope to continue that for years to come as my knowledge and experience evolve. The front end is a React PWA tested with Jest and Enzyme and hosted on Firebase.  
The [backend](https://github.com/travisdock/sum-backend) is a Rails API hosted on Heroku.

## Try It Out
Click "login" and use the username "test" with password "test" to see functionality. Feel free to add and remove entries, categories, etc.
https://sumfinance-b89c6.firebaseapp.com/
   
<p align="center">
  <kbd>
    <img src="https://user-images.githubusercontent.com/36681963/47618668-0224db00-daac-11e8-8af1-eed23848440a.PNG" alt="login" width="200" title="login page">
  </kbd>
  <kbd>
    <img src="https://user-images.githubusercontent.com/36681963/47618667-0224db00-daac-11e8-98e5-3249e8c1d03a.PNG" alt="new entry page" width="200" title="new entry page">
  </kbd>
  <kbd>
    <img src="https://user-images.githubusercontent.com/36681963/47618666-018c4480-daac-11e8-9fa9-2c5e5fdd5693.PNG" alt="table page" width="200" title="table page">
  </kbd>
  <kbd>
    <img src="https://user-images.githubusercontent.com/36681963/47618665-018c4480-daac-11e8-8e47-068959636d55.PNG" alt="entry view page" width="200" title="entry view page">
  </kbd>
</p>

## Things to do:

### Functionality
- [ ] Continue adding test coverage
- [ ] Change new category flow
- [ ] Year view does not actually show current year if no entries for current year
- [ ] Add error for bad backend connection
- [ ] Add ability to export csv
- [ ] When a category is deleted, add option to shift entries to existing category
- [ ] Add user ability to edit profile (username, email, password) to settings page
- [ ] Add change in averages to stats

### Esthetics
- [ ] Add pwa icon image
- [ ] Color code stats for readability?

### Misc/Unformed Ideas
- [ ] Change caching strategy to allow immediate updates?
- [ ] Change charts to D3?
- [ ] Test and improve accessibility
- [ ] Add separate components for mobile and desktop viewing?
- [ ] Percent of income saved, spent, donated?
- [ ] Recurring payments
- [ ] Savings and goals
