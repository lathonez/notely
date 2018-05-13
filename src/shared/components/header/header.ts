import './header.scss';
import { Injectable, IComponentOptions, IControllerConstructor, IController } from 'angular';
import {UserService} from '../../services/user';

export class HeaderComponent implements IComponentOptions {

  public controller: Injectable<IControllerConstructor> = HeaderController;
  public template: string = require('./header.html').toString();
  public bindings: { [binding: string]: string; } = {
    title: '<'
  };
}

/**
 * home - Controller
 *
 * @export
 * @class HomeController
 */
export class HeaderController implements IController {

  // dependency injection
  public static $inject: Array<string> = ['$log', '$state', 'UserService'];

  public email: string;

  // vendor services
  private $log: any;
  private $state: any;

  // notely services
  private user: UserService;

  /**
   * @param {*} $log Angular Log Service
   */
  constructor($log: any, $state: any, user: UserService) {
    this.$log = $log.getInstance('Header', false);
    this.$log.debug('constructor');
    this.$state = $state;
    this.user = user;
  }

  /**
   * Logout of the app
   */
  public logout(): void {
    this.user.logout();
    this.$state.go('login');
  }

  /**
   * life cycle hook
   */
  public $onInit(): void {
    this.$log.debug('onInit');
    this.email = this.user.getLoggedInEmail();
  }
}
