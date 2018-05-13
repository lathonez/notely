// vendor imports
import 'angular';
import '@uirouter/angularjs';
import 'angular-material';
import 'angular-cookies';
import 'angular-material-data-table';
import 'LogUnobtrusiveExtension/dist/log-ex-unobtrusive';
import * as angular from 'angular';

// app css
import './app/app.scss';

// app imports
import Components from './shared/components/components';

import CreateAndViewModule from './create-and-view/module';
import LoginModule from './login/module';
import OverviewModule from './overview/module';
import RegisterModule from './register/module';
import ServicesModule from './shared/services/module';

import {AppComponent} from './app/app';
import AppConfig from './app/app.config';

// top level angular module for app
angular.module('app', [
  'ngCookies',
  'ngMaterial',
  'md.data.table',
  'log.ex.uo',
  'ui.router',
  Components.name,
  CreateAndViewModule.name,
  LoginModule.name,
  OverviewModule.name,
  RegisterModule.name,
  ServicesModule.name,
])
.config(AppConfig)
.component('app', new AppComponent());

// start angular using code instead of ng-app declaration in the index.html
angular.bootstrap(document, ['app'], {
    strictDi: true
});
