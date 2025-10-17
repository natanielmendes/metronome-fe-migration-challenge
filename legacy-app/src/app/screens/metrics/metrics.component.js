import template from './metrics.template.html';
import { incrementWins } from '../../store';
import WinsCounter from '../../components/react-widgets/WinsCounter.jsx';

export class MetricsController {
  static $inject = ['$ngRedux', '$scope', 'ReactWidgetBridgeService'];

  constructor($ngRedux, $scope, ReactWidgetBridgeService) {
    this.$ngRedux = $ngRedux;
    this.$scope = $scope;
    this.reactBridge = ReactWidgetBridgeService;

    this.wins = 0;
    this.openIncidentCount = 0;
    this.maintenanceMode = false;
    this.disconnect = null;
  }

  $onInit() {
    this.disconnect = this.$ngRedux.connect((state) => ({
      wins: state.workspace.wins,
      openIncidentCount: state.workspace.openIncidentCount,
      maintenanceMode: state.workspace.maintenanceMode
    }))(this);

    // Mount React widget (Exercise 1)
    this.reactBridge.mount('#react-wins-widget', WinsCounter);

    this.$scope.$on('$destroy', () => this.$onDestroy());
  }

  $onDestroy() {
    // Unmount React widget
    this.reactBridge.unmount('#react-wins-widget');

    if (this.disconnect) {
      this.disconnect();
      this.disconnect = null;
    }
  }

  increment() {
    this.$ngRedux.dispatch(incrementWins(1));
  }
}

export const MetricsComponent = {
  controller: MetricsController,
  template
};
