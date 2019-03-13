# Checklist Frontend

Simple to-do list UI built with Angular 6 and Bootstrap 4.

https://checklist-frontend.azurewebsites.net

### Run solution locally
1. In the command line, switch over to the project folder.
2. Run `npm install` to pull down all the relevant node modules.
3. Run `ng serve --open` for a dev server. This will load up the solution in a browser at http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Hosting in Heroku
Follow instructions in this article https://medium.com/@hellotunmbi/how-to-deploy-angular-application-to-heroku-1d56e09c5147. Use `"heroku-postbuild": "ng build --prod"` instead of `"postinstall": "ng build --aot -prod"` in the package.json (see comments in article).

### Hosting in Azure
If you are using angular-routing you will have to add a web.config with rules to redirect traffic to index.html. Follow the steps outlined by MalateshPatil: https://github.com/angular/angular-cli/issues/2885.
