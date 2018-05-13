import {NotesService} from './notes';
import {UserService} from './user';

export class LocalStorageService {

  public static $inject: [string] = ['$log'];
  public $log: any;

  private static NAMESPACE_KEY_SEP: string = '--------';
  private static JSON_NAMESPACES: Array<string> = [NotesService.LOCAL_STORAGE_NAMESPACE, UserService.LOCAL_STORAGE_NAMESPACE];

  /**
   * @param {$log} $log - Angular logging Service.
   */
  constructor($log: any) {
   this.$log = $log;
  }

  /**
   * Set a value in local storage by namespace and ID
   *
   * @param {string} namespace
   * @param {string} id
   * @param value
   */
  public set(namespace: string, id: string, value: any): void {
    window.localStorage.setItem(LocalStorageService.getKey(namespace, id), LocalStorageService.stringify(namespace, value));
  }

  /**
   * Get a value from local storage by namespace and ID
   *
   * @param {string} namespace
   * @param {string} id
   * @returns {any}
   */
  public get(namespace: string, id: string): any {

    let value: any = window.localStorage.getItem(LocalStorageService.getKey(namespace, id));

    if (!value) {
      return undefined;
    }

    return LocalStorageService.parse(namespace, value);
  }

  /**
   * Get all values from a given namespace
   *
   * @param {string} namespace
   * @returns {Array<any>}
   */
  public getAll(namespace: string): Array<any> {
    let rtn: any = LocalStorageService.getIds(namespace).map(id => this.get(namespace, id));
    return rtn;
  }

  //
  // private functions
  //

  /**
   * Get all ids (local storage keys) from a given namespace
   *
   * @param {string} namespace
   * @returns {Array<string>}
   */
  private static getIds(namespace: string): Array<string> {
    let ids: Array<string> = [];

    for (let i: number = 0; i < window.localStorage.length; i++) {
      let key: string = window.localStorage.key(i);

      if (key.indexOf(namespace) > -1) {
        ids.push(key.split(LocalStorageService.NAMESPACE_KEY_SEP)[1]);
      }
    }

    return ids;
  }

  /**
   * Get a key string from namespace and ID
   *
   * @param {string} namespace
   * @param {string} id
   * @returns {string}
   */
  private static getKey(namespace: string, id: string): string {
    return `${namespace}${LocalStorageService.NAMESPACE_KEY_SEP}${id}`;
  }

  /**
   * JSON.parse a value from local storage if appropriate for this namespace
   *
   * @param {string} namespace
   * @param {string} value
   * @returns {any}
   */
  private static parse(namespace: string, value: string): any {
    if (LocalStorageService.JSON_NAMESPACES.indexOf(namespace) > -1) {
      return JSON.parse(value);
    }

    return value;
  }

  /**
   * JSON.stringify a value to local storage if appropriate for this namespace
   *
   * @param {string} namespace
   * @param {string} value
   * @returns {any}
   */
  private static stringify(namespace: string, value: string): any {
    if (LocalStorageService.JSON_NAMESPACES.indexOf(namespace) > -1) {
      return JSON.stringify(value);
    }

    return value;
  }
}
