# Checklist Frontend

Simple to-do list UI made with Angular 6. Check it out at http://checklist-postgres.herokuapp.com/. Currently it is pulling the data from this backend https://github.com/ash-midgley/checklist-postgres which is hosted in Azure.

### Run locally
1. Pull down the solution.
2. In the command line switch over to the ChecklistWeb folder within the root checklist-frontend folder.
3. Run `ng serve --open` for a dev server. This will load up the solution in a browser at http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Hosting in Heroku
Follow instructions in this Medium article https://medium.com/@hellotunmbi/how-to-deploy-angular-application-to-heroku-1d56e09c5147. The only issue I came across was with `"postinstall": "ng build --aot -prod"` breaking the Heroku build. Replacing this with `"heroku-postbuild": "ng build --prod"` in the package.json fixed this issue for me (see comments in article).
