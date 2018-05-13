import {LocalStorageService} from './local-storage';
import {NotesService} from './notes';

describe('Service::LocalStorage', () => {
  let localStorageService: any;

  // load app module so we can access everything
  beforeEach(window.module('app'));

  // inject service to test
  beforeEach(inject((_LocalStorageService_) => {
    localStorageService = _LocalStorageService_
  }));

  describe('::constructor()', () => {
    it('should have a $log service', () => {
      expect(localStorageService.$log).toBeDefined();
    });
  });

  describe('::set()', () => {
    it('sets local storage', () => {
      spyOn(LocalStorageService, 'getKey' as any).and.returnValue('TEST-KEY');
      spyOn(LocalStorageService, 'stringify' as any).and.returnValue('TEST-VAL');
      spyOn(window.localStorage, 'setItem');

      localStorageService.set('namespace', 'id', 'value');

      expect(LocalStorageService['getKey']).toHaveBeenCalledWith('namespace', 'id');
      expect(LocalStorageService['stringify']).toHaveBeenCalledWith('namespace', 'value');
      expect(window.localStorage.setItem).toHaveBeenCalledWith('TEST-KEY', 'TEST-VAL');
    });
  });

  describe('::get()', () => {
    it('gets local storage (undefined)', () => {
      spyOn(window.localStorage, 'getItem').and.returnValue(false);
      expect(localStorageService.get('TEST-NS', 'TEST-ID')).not.toBeDefined();
    });

    it('gets local storage', () => {
      spyOn(window.localStorage, 'getItem').and.returnValue('an item');
      spyOn(LocalStorageService, 'parse' as any).and.returnValue('an item');
      expect(localStorageService.get('TEST-NS', 'TEST-ID')).toEqual('an item');
      expect(LocalStorageService['parse'] as any).toHaveBeenCalledWith('TEST-NS', 'an item');
    });
  });

  describe('::getAll()', () => {
    it('gets all', () => {
      spyOn(LocalStorageService, 'getIds' as any).and.returnValue([1, 2, 3, 4]);
      spyOn(localStorageService, 'get').and.returnValue('TEST-ITEM');
      expect(localStorageService.getAll('TEST-NS')).toEqual(['TEST-ITEM', 'TEST-ITEM', 'TEST-ITEM', 'TEST-ITEM']);
      expect(localStorageService.get).toHaveBeenCalledTimes(4);
    });
  });

  describe('::getIds', () => {
    it('gets ids', () => {
      spyOnProperty(window.localStorage, 'length', 'get').and.returnValue(3);
      spyOn(window.localStorage, 'key').and.returnValue('TEST-NS--------TEST-ID');
      expect(LocalStorageService['getIds']('TEST-NS')).toEqual(['TEST-ID', 'TEST-ID', 'TEST-ID']);
      expect(window.localStorage.key).toHaveBeenCalledTimes(3);
    });

    it('does not get ids', () => {
      spyOnProperty(window.localStorage, 'length', 'get').and.returnValue(3);
      spyOn(window.localStorage, 'key').and.returnValue('DANGER-NS--------TEST-ID');
      expect(LocalStorageService['getIds']('TEST-NS')).toEqual([]);
      expect(window.localStorage.key).toHaveBeenCalledTimes(3);
    });
  });

  describe('::getKey', () => {
    it('gets the key', () => {
      expect(LocalStorageService['getKey']('TEST-NS', 'TEST-ID')).toEqual('TEST-NS--------TEST-ID');
    });
  });

  describe('::parse', () => {
    it('parses', () => {
      let testObj: any = {test: 'obj'};
      expect(LocalStorageService['parse'](NotesService.LOCAL_STORAGE_NAMESPACE, JSON.stringify(testObj))).toEqual(testObj);
    });

    it('does not parse', () => {
      let testObj: any = {test: 'obj'};
      expect(LocalStorageService['parse']('TEST-NS', JSON.stringify(testObj))).toEqual(JSON.stringify(testObj));
    });
  });

  describe('::stringify', () => {
    it('stringifies', () => {
      let testObj: any = {test: 'obj'};
      expect(LocalStorageService['stringify'](NotesService.LOCAL_STORAGE_NAMESPACE, testObj)).toEqual(JSON.stringify(testObj));
    });

    it('does not stringify', () => {
      let testObj: any = {test: 'obj'};
      expect(LocalStorageService['stringify']('TEST-NS', testObj)).toEqual(testObj);
    });
  });

});
