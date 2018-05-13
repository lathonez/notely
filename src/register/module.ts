// import app component classes
import * as angular from 'angular';
import { RegisterComponent } from './register';

// bundle component classes into angular components
export default angular.module('register', [])
  .component('register', new RegisterComponent())
