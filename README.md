# nano-recipes

Native app currently on the play store. Features: 

- Random recipes pulled from a postgreSQL database
- A recipe scraper. The app calls a cloud function, which parses the url and crawls the page looking for the recipe and ingredients on that page. The recipe can then be saved with local device storage, no auth required
