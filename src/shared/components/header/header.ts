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
 * Responsible for the top bar / header
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
     * @param $state
     * @param user
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

    // the router will take us back here anyway if we try to go to a protected page (overview etc)
    this.$state.go('login');
  }

  /**
   * life cycle hook
   */
  public $onInit(): void {
    this.$log.debug('onInit');

    // get the user's email address to display in the header
    // if they aren't logged in nothing will show up
    this.email = this.user.getLoggedInEmail();
  }
}
