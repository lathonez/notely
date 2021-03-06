import './register.scss';
import { Injectable, IComponentOptions, IControllerConstructor, IController } from 'angular';
import {User, UserService} from '../shared/services/user';

export class RegisterComponent implements IComponentOptions {
  public controller: Injectable<IControllerConstructor> = RegisterController;
  public template: string = require('./register.html').toString();
}

/**
 * Handles registration of new users
 */
export class RegisterController implements IController {

  public static MIN_PASS_LENGTH: number = 8;

  // dependency injection
  public static $inject: Array<string> = ['$log', '$state', 'UserService'];

  public pageTitle: string = 'Sign up for Notely';

  // form controls
  public name: string = '';
  public email: string = '';
  public password: string = '';
  public passwordConf: string = '';

  // an error message we might display to the user
  public error: string = '';

  // vendor services
  public $log: any;
  public $state: any;

  // notely services
  public user: UserService;

  /**
   * @param {*} $log Angular Log Service
   */
  constructor($log: any, $state: any, user: UserService) {
    this.$log = $log.getInstance('Register');
    this.$log.debug('constructor');
    this.$state = $state;
    this.user = user;
  }

  /**
   * Attempt to register
   *
   * @returns {User}
   */
  public submit(): User {

    // reset errors
    this.error = '';

    // if the password doesn't match or is too short we'll get an error message back here
    let passwordValidation: string = this.validatePassword(this.password, this.passwordConf);

    if (passwordValidation) {
      // set the error binding and return
      this.error = passwordValidation;
      return;
    }

    try {
      // password checks out - try to register
      this.user.add({name: this.name, email: this.email, password: this.password});

      // if we've got this far we can safely navigate to overview
      this.$state.go('overview');
    } catch (error) {
      this.error = this.errorHandler(error);
      return;
    }

  }

  /**
   * Helper to check if passwords are OK
   *
   * @param {string} password
   * @param {string} passwordConf
   * @returns {string} - error message to be displayed on fail
   */
  public validatePassword(password: string, passwordConf: string): string {
    if (password !== passwordConf) {
      return 'the passwords you have entered do not match';
    }

    if (password.length < RegisterController.MIN_PASS_LENGTH) {
      return `please enter at least ${RegisterController.MIN_PASS_LENGTH} digits for your password`;
    }

    return '';
  }

  /**
   * life cycle hook
   */
  public $onInit(): void {
    this.$log.debug('onInit');
  }

  //
  // Private fns
  //

  /**
   * Translate errors thrown from the UserService into human form
   *
   * @param error
   * @returns {string}
   */
  private errorHandler(error: any): string {
    switch (true) {
      case error.toString().indexOf('EMAIL EXISTS') > -1:
        return 'A user with that email address already exists';
      default:
        this.$log.error(error);
        return 'An unexpected error has occurred signing you up!'
    }
  }
}
