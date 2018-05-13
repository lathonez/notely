// import app component classes
import * as angular from 'angular';
import {OverviewComponent} from './overview';

// bundle component classes into angular components
export default angular.module('overview', [])
  .component('overview', new OverviewComponent())
