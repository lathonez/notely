// import app component classes
import * as angular from 'angular';
import { LoginComponent } from './login';

// bundle component classes into angular components
export default angular.module('login', [])
  .component('login', new LoginComponent())
