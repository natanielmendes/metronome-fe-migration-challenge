import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-messages';
import '@uirouter/angularjs';
import ngRedux from 'ng-redux';

import { LayoutRootComponent } from './components/layout-root/layout-root.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { OverviewComponent } from './screens/overview/overview.component';
import { MetricsComponent } from './screens/metrics/metrics.component';
import { TeamComponent } from './screens/team/team.component';
import { SettingsComponent } from './screens/settings/settings.component';
import { ApiClient } from './services/api-client';
import { StateBootstrapService } from './services/state-bootstrap.service';
import { ReactWidgetBridgeService } from './services/react-widget-bridge.service';
import { rootReducer } from './store';

angular
  .module('legacyApp', ['ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria', 'ui.router', ngRedux])
  .component('layoutRoot', LayoutRootComponent)
  .component('sideMenu', SideMenuComponent)
  .component('topBar', TopBarComponent)
  .component('overviewScreen', OverviewComponent)
  .component('metricsScreen', MetricsComponent)
  .component('teamScreen', TeamComponent)
  .component('settingsScreen', SettingsComponent)
  .service('ApiClient', ApiClient)
  .service('StateBootstrapService', StateBootstrapService)
  .service('ReactWidgetBridgeService', ReactWidgetBridgeService)
  .config([
    '$ngReduxProvider',
    '$mdThemingProvider',
    '$stateProvider',
    '$urlRouterProvider',
    ($ngReduxProvider, $mdThemingProvider, $stateProvider, $urlRouterProvider) => {
      $ngReduxProvider.createStoreWith(rootReducer, [], []);

      $mdThemingProvider
        .theme('default')
        .primaryPalette('indigo')
        .accentPalette('amber')
        .backgroundPalette('grey', { default: '50' });

      $stateProvider
        .state('overview', {
          url: '/overview',
          component: 'overviewScreen'
        })
        .state('metrics', {
          url: '/metrics',
          component: 'metricsScreen'
        })
        .state('metrics-react', {
          url: '/metrics-react',
          template: '<div id="react-full-screen" style="min-height: 500px;"></div>',
          onEnter: ['ReactWidgetBridgeService', async (ReactWidgetBridgeService) => {
            // Dynamically import the React screen component
            const { default: MetricsReact } = await import('./screens/react-screens/MetricsReact.jsx');
            // Small delay to ensure DOM is ready
            setTimeout(() => {
              ReactWidgetBridgeService.mount('#react-full-screen', MetricsReact);
            }, 10);
          }],
          onExit: ['ReactWidgetBridgeService', (ReactWidgetBridgeService) => {
            ReactWidgetBridgeService.unmount('#react-full-screen');
          }]
        })
        .state('team', {
          url: '/team',
          component: 'teamScreen'
        })
        .state('settings', {
          url: '/settings',
          component: 'settingsScreen'
        });

      $urlRouterProvider.otherwise('/overview');
    }
  ])
  .run([
    'StateBootstrapService',
    (stateBootstrap) => {
      stateBootstrap.init();
    }
  ]);
