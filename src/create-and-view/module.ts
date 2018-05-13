// import app component classes
import * as angular from 'angular';
import {CreateAndViewComponent} from './create-and-view';

// bundle component classes into angular components
export default angular.module('createAndView', [])
  .component('createAndView', new CreateAndViewComponent())
