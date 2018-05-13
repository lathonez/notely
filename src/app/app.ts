import { Injectable, IComponentOptions, IControllerConstructor, IController } from 'angular';

/**
 * Main Application - Component Definition
 *
 * @export
 * @class App
 * @implements {ng.IComponentOptions}
 */
export class AppComponent implements IComponentOptions {

  // controller used with component
  public controller: Injectable<IControllerConstructor> = AppController;

  // template used with component
  public template: string = require('./app.html').toString();
}

/**
 * App - Controller
 *
 * @export
 * @class AppController
 */
export class AppController implements IController {

  // dependency injection
  public static $inject: Array<string> = ['$log'];
  public $log: any;

  /**
   * App Constructor
   *
   * @param $log
   */
  constructor($log: any) {
    this.$log = $log.getInstance('AppController', false);
    this.$log.debug('constructor');
  }

  /**
   * ng lifecycle hook
   */
  public $onInit(): void {
    this.$log.debug('onInit')
  }
}
