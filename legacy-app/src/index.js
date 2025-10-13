import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-messages';
import 'angular-material';
import '@uirouter/angularjs';

import 'angular-material/angular-material.css';
import './styles/global.css';

import './app/app.module';

angular.element(document).ready(() => {
  angular.bootstrap(document.body, ['legacyApp'], { strictDi: true });
});
