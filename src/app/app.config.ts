import * as angular from 'angular';
import { StateProvider, UrlService } from '@uirouter/angularjs';
import {UserService} from '../shared/services/user';

AppConfig.$inject = ['$locationProvider', 'logExProvider', '$compileProvider', '$mdIconProvider', '$stateProvider', '$transitionsProvider', '$urlServiceProvider'];

/**
 * Configure Notely
 *
 * @param $locationProvider
 * @param logExProvider
 * @param $compileProvider
 * @param $mdIconProvider
 * @param {StateProvider} $stateProvider
 * @param $transitionsProvider
 * @param {UrlService} $urlServiceProvider
 * @constructor
 */
export default function AppConfig(
  $locationProvider: any,
  logExProvider: any,
  $compileProvider: any,
  $mdIconProvider: any,
  $stateProvider: StateProvider,
  $transitionsProvider: any,
  $urlServiceProvider: UrlService
): void {

  configureLogging(logExProvider);

  // setup routing
  buildStates($stateProvider, $urlServiceProvider);

  // check the the user is authenticated appropriately for protected areas
  $transitionsProvider.onBefore({}, transition => checkUserAuth(transition, injectCookiesBypass()));

  // disable angular debug info if app is not running locally. This increases performance in production
  $compileProvider.debugInfoEnabled(isDev(window.location.href));

  // enable browser back button
  $locationProvider.html5Mode(false);

  // set angular material icon font set
  $mdIconProvider.defaultFontSet('Material Icons')
}

/**
 * Define routes in the application
 *
 * @param {StateProvider} $stateProvider
 * @param {UrlService} $urlServiceProvider
 * @returns Array<{name: string; url: string; component: string}>
 */
function buildStates($stateProvider: StateProvider, $urlServiceProvider: UrlService): Array<{name: string, url: string, component: string}> {

  let states: Array<{name: string, url: string, component: string, protected?: boolean}> = [
    {
      name: 'register',
      url: '/register',
      component: 'register'
    },
    {
      name: 'login',
      url: '/login',
      component: 'login'
    },
    {
      name: 'createAndView',
      url: '/createAndView',
      component: 'createAndView',
      protected: true,
    },
    {
      name: 'overview',
      url: '/overview',
      component: 'overview',
      protected: true,
    }
  ];

  // add exceptions
  $urlServiceProvider.rules.when('', '/overview');
  $urlServiceProvider.rules.otherwise('/overview');

  // add each state to the provider
  states.forEach(state => $stateProvider.state(state.name, state));

  return states;
}

/**
 * This function is called each time a state transitions
 * to make if the user should be allowed to navigate to their chosen page
 *
 * @param transition
 * @param $cookies
 */
function checkUserAuth(transition: any, $cookies: any): void {
  if (transition.to().protected && !UserService.isLoggedIn($cookies)) {
    // redirect to the 'login' state
    return transition.router.stateService.target('login');
  }
}

/**
 * Configure logging to use a different prefix
 *
 * @param logExProvider
 */
function configureLogging(logExProvider: any): void {
  // debug and logging config
  logExProvider.enableLogging(true, false);
  logExProvider.useDefaultLogPrefix(false);
  logExProvider.overrideLogPrefix(logPrefix);
}

/**
 * Workaround cookies being unavailable in AppConfig injection
 *
 * @returns {any}
 */
function injectCookiesBypass(): any {

  let $cookies: any;
  angular.injector(['ngCookies']).invoke(['$cookies', _$cookies_ => {
    $cookies = _$cookies_;
  }]);

  return $cookies;
}

/**
 * Helper to check whether or not we're running on dev
 *
 * @param {string} href
 * @returns {boolean}
 */
function isDev(href: string): boolean {
  return href.indexOf('localhost') > -1 || href.indexOf('127.0.0.1') >= 1;
}

/**
 * Small function to modify the log prefix based on the className
 *
 * @param {string} className
 * @returns {string}
 */
function logPrefix(className: string): string {
  return `${(!angular.isString(className) ? 'Notely' : className)} ~ `;
}
