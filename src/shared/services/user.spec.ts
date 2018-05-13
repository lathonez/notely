import {UserService} from './user';

describe('Service::UserStorage', () => {
  let userService: any;

  // load app module so we can access everything
  beforeEach(window.module('app'));

  // inject service to test
  beforeEach(inject((_UserService_) => {
    userService = _UserService_
  }));

  describe('::constructor()', () => {
    it('should have a $log service', () => {
      expect(userService.$log).toBeDefined();
    });
  });

  describe('::add()', () => {
    it('adds a user', () => {
      spyOn(userService, 'emailExists').and.returnValue(false);
      spyOn(userService.storage, 'set');
      spyOn(userService, 'setSession');
      spyOn(userService, 'get').and.returnValue('TEST-USER');
      expect(userService.add({email: 'TEST-EMAIL'})).toEqual('TEST-USER');
      expect(userService.storage.set).toHaveBeenCalledWith(UserService.LOCAL_STORAGE_NAMESPACE, 'TEST-EMAIL', ({email: 'TEST-EMAIL', avatar: 'avatar.png'}));
      expect(userService.setSession).toHaveBeenCalledWith('TEST-EMAIL');
      expect(userService.get).toHaveBeenCalledWith('TEST-EMAIL');
    });

    it('throws an error when adding a user', () => {
      spyOn(userService, 'emailExists').and.returnValue(true);
      expect(() => userService.add({email: 'TEST-EMAIL'})).toThrowError('EMAIL EXISTS');
    });
  });

  describe('::get()', () => {
    it('gets a user', () => {
      spyOn(userService.storage, 'get').and.returnValue('TEST-USER');
      expect(userService.get('TEST-EMAIL')).toEqual('TEST-USER');
      expect(userService.storage.get).toHaveBeenCalledWith(UserService.LOCAL_STORAGE_NAMESPACE, 'TEST-EMAIL');
    });
  });

  describe('::getLoggedInEmail()', () => {
    it('gets the logged in email', () => {
      spyOn(userService.$cookies, 'get').and.returnValue('TEST-EMAIL');
      expect(userService.getLoggedInEmail()).toEqual('TEST-EMAIL');
      expect(userService.$cookies.get).toHaveBeenCalledWith(UserService.SESSION_COOKIE_NAME);
    });
  });

  describe('::isLoggedIn()', () => {
    it('checks whether the user is logged in (true)', () => {
      let cookies: any = {get: (() => true)};
      spyOn(cookies, 'get').and.returnValue('TEST-EMAIL');
      expect(UserService.isLoggedIn(cookies)).toEqual(true);
      expect(cookies.get).toHaveBeenCalledWith(UserService.SESSION_COOKIE_NAME);
    });

    it('checks whether the user is logged in (false)', () => {
      let cookies: any = {get: (() => true)};
      spyOn(cookies, 'get').and.returnValue(undefined);
      expect(UserService.isLoggedIn(cookies)).toEqual(false);
      expect(cookies.get).toHaveBeenCalledWith(UserService.SESSION_COOKIE_NAME);
    });
  });

  describe('::login()', () => {
    it('logs in', () => {
      spyOn(userService.storage, 'get').and.returnValue({email: 'TEST-EMAIL', password: 'TEST-PASSWORD'});
      spyOn(userService, 'setSession');
      expect(userService.login('TEST-EMAIL', 'TEST-PASSWORD')).toEqual({email: 'TEST-EMAIL', password: 'TEST-PASSWORD'});
      expect(userService.storage.get).toHaveBeenCalledWith(UserService.LOCAL_STORAGE_NAMESPACE, 'TEST-EMAIL');
      expect(userService.setSession).toHaveBeenCalledWith('TEST-EMAIL');
    });

    it('does not login (no user)', () => {
      spyOn(userService.storage, 'get').and.returnValue(undefined);
      expect(() => userService.login('TEST-EMAIL', 'TEST-PASSWORD')).toThrowError('INVALID USERNAME OR PASSWORD');
    });

    it('does not login (incorrect password)', () => {
      spyOn(userService.storage, 'get').and.returnValue({email: 'TEST-EMAIL', password: 'NOT-TEST-PASSWORD'});
      expect(() => userService.login('TEST-EMAIL', 'TEST-PASSWORD')).toThrowError('INVALID USERNAME OR PASSWORD');
    });
  });

  describe('::logout()', () => {
    it('logs out', () => {
      spyOn(userService.$cookies, 'remove');
      userService.logout();
      expect(userService.$cookies.remove).toHaveBeenCalledWith(UserService.SESSION_COOKIE_NAME);
    });
  });

  describe('::emailExists()', () => {
    it('checks that the email exists (true)', () => {
      spyOn(userService.storage, 'getAll').and.returnValue([{email: 'email1'}, {email: 'email2'}, {email: 'TEST-EMAIL'}]);
      expect(userService.emailExists('TEST-EMAIL')).toEqual(true);
    });

    it('checks that the email exists (false)', () => {
      spyOn(userService.storage, 'getAll').and.returnValue([{email: 'email1'}, {email: 'email2'}, {email: 'NOT-TEST-EMAIL'}]);
      expect(userService.emailExists('TEST-EMAIL')).toEqual(false);
    });
  });

  describe('::setSession()', () => {
    it('sets the session', () => {
      spyOn(userService.$cookies, 'put');
      userService.setSession('TEST-EMAIL');
      expect(userService.$cookies.put).toHaveBeenCalledWith(UserService.SESSION_COOKIE_NAME, 'TEST-EMAIL', jasmine.any(Object));
    });
  });
});
