import {LocalStorageService} from './local-storage';

export declare interface User {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export class UserService {
  public static $inject: Array<string> = ['$log', '$cookies', 'LocalStorageService'];

  public static LOCAL_STORAGE_NAMESPACE: string = 'notely-user';
  public static SESSION_COOKIE_NAME: string = 'notely-session';
  public $cookies: any;
  public $log: any;
  public storage: LocalStorageService;

  /**
   * Service concerned with Users
   *
   * @param $log
   * @param $cookies
   * @param {LocalStorageService} storage
   */
  constructor($log: any, $cookies: any, storage: LocalStorageService) {
    this.$cookies = $cookies;
    this.$log = $log;
    this.storage = storage;
  }

  /**
   * Add a user to Notely
   *
   * @param {User} user
   * @returns {User}
   */
  public add(user: User): User {

    if (this.emailExists(user.email)) {
      throw new Error('EMAIL EXISTS');
    }

    // for now just give the default avatar for new users
    user.avatar = 'avatar.png';

    // save the user to local storage
    this.storage.set(UserService.LOCAL_STORAGE_NAMESPACE, user.email, user);

    // set the session cookie so the router will recognise them as being logged in
    this.setSession(user.email);

    return this.get(user.email);
  }

  /**
   * Return a user by email
   *
   * @param {string} email
   * @returns {User}
   */
  public get(email: string): User {
    return this.storage.get(UserService.LOCAL_STORAGE_NAMESPACE, email);
  }

  public getLoggedInEmail(): string {
    return this.$cookies.get(UserService.SESSION_COOKIE_NAME);
  }

  /**
   * Returns true if a session for this user exists
   *
   * @returns {boolean}
   */
  public static isLoggedIn($cookies: any): boolean {

    if ($cookies.get(UserService.SESSION_COOKIE_NAME)) {
      return true;
    }

    return false;
  }

  /**
   * Check credentials and log the user in by setting a session cookie
   *
   * @param {string} email
   * @param {string} password
   * @returns {User}
   */
  public login(email: string, password: string): User {

    let user: User = this.storage.get(UserService.LOCAL_STORAGE_NAMESPACE, email);

    if (!user || user.password !== password) {
      throw new Error('INVALID USERNAME OR PASSWORD');
    }

    this.setSession(email);

    return user;
  }

  /**
   * Delete the session cookie logging us out of the app
   */
  public logout(): void {
    this.$cookies.remove(UserService.SESSION_COOKIE_NAME);
  }

  //
  // Private Fns
  //

  /**
   * Check if an email exists in local storage already
   *
   * @param {string} email
   * @returns {boolean}
   */
  private emailExists(email: string): boolean {

    // when we register a new user we need to load all the existing emails to make sure there's no duplicates
    if (this.storage.getAll(UserService.LOCAL_STORAGE_NAMESPACE).find(user => user.email === email)) {
      return true;
    }

    return false;
  }

  /**
   * Set a session cookie as the user's email which will expire one day from now
   *
   * @param {string} email
   */
  private setSession(email: string): void {

    let expiryDate: Date = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);

    this.$cookies.put(UserService.SESSION_COOKIE_NAME, email, {
      expires: expiryDate
    });
  }
}
