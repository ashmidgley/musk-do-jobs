# Checklist Frontend

Simple to-do list UI built with Angular 6 and Bootstrap 4.

https://checklist-frontend.azurewebsites.net/

### Run Angular solution locally
1. In the command line, switch over to the project folder.
2. Run `npm install` to pull down all the relevant node modules.
3. Run `ng serve --open` for a dev server. This will load up the solution in a browser at http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Hosting in Heroku
Follow instructions in this Medium article https://medium.com/@hellotunmbi/how-to-deploy-angular-application-to-heroku-1d56e09c5147. The only issue I came across was with `"postinstall": "ng build --aot -prod"` breaking the Heroku build. Replacing this with `"heroku-postbuild": "ng build --prod"` in the package.json fixed this issue for me (see comments in article).

### Hosting in Azure
1. On the command line, navigate to the project's root folder and run `ng build --prod`. This will create a dist folder with the built package.
1. Create or login to Azure account at http://portal.azure.com.
2. Add new 'Web App' in App Services tab.
3. Setup as you like. I go for OS = Windows and Publish = Code.
4. Once created download the publish profile.
5. Open up the publish profile in a text editor. Use the FTP credentials with a FTP Client (like FileZilla) to connect to the server.
6. Once connected, copy the values in the dist/project-name folder into the wwwroot folder on the server.
7. Navigate to your site. It should be up and running.

NOTE: If you are using angular-routing you will have to add a web.config in the src folder to get the application working. Follow the steps outlined by MalateshPatil: https://github.com/angular/angular-cli/issues/2885.
