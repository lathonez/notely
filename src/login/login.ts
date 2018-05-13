import './login.scss';
import { Injectable, IComponentOptions, IControllerConstructor, IController } from 'angular';
import {User, UserService} from '../shared/services/user';

export class LoginComponent implements IComponentOptions {

  public controller: Injectable<IControllerConstructor> = LoginController;
  public template: string = require('./login.html').toString();
}

/**
 * home - Controller
 *
 * @export
 * @class HomeController
 */
export class LoginController implements IController {

  // dependency injection
  public static $inject: Array<string> = ['$log', '$state', 'UserService'];

  public pageTitle: string = 'Login to Notely';

  // an error from login to display to the user
  public error: string;

  // form variables
  public email: string;
  public password: string;

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
    this.$log = $log.getInstance('Login');
    this.$log.debug('constructor');
    this.$state = $state;
    this.user = user;
  }

  /**
   * Login to Notely
   *
   * @returns {User}
   */
  public submit(): User {
    try {
      this.user.login(this.email, this.password);
      this.$state.go('overview');
    } catch (error) {
      this.error = this.errorHandler(error);
      return;
    }
  }

  /**
   * life cycle hook
   */
  public $onInit(): void {
    this.$log.debug('onInit');
  }

  private errorHandler(error: Error): string {
    switch (true) {
      case error.toString().indexOf('INVALID USERNAME OR PASSWORD') > -1:
        return 'Invalid username or password';
      default:
        this.$log.error(error);
        return 'An unexpected error has occurred while logging you in';
    }
  }
}
