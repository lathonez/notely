import {NotesService} from './notes';

describe('Service::Notes', () => {
  let notesService: any;

  // load app module so we can access everything
  beforeEach(window.module('app'));

  // inject service to test
  beforeEach(inject((_NotesService_) => {
    notesService = _NotesService_
  }));

  describe('::constructor()', () => {
    it('should have a $log service', () => {
      expect(notesService.$log).toBeDefined();
    });
  });

  describe('::add()', () => {
    it('adds a note', () => {
      spyOn(notesService.storage, 'set');
      spyOn(notesService.storage, 'get').and.returnValue('a note');
      spyOn(notesService, 'getUUID').and.returnValue('uuid');
      expect(notesService.add('TEST-EMAIL', 'TEST-TITLE', 'TEST-BODY')).toEqual('a note');
      expect(notesService.storage.set).toHaveBeenCalled();
      expect(notesService.storage.get).toHaveBeenCalledWith(NotesService.LOCAL_STORAGE_NAMESPACE, 'uuid');
    });
  });

  describe('::getAll()', () => {
    it('gets all the notes', () => {
      spyOn(notesService.storage, 'getAll').and.returnValue(['note1', 'note2', 'note3']);
      expect(notesService.getAll()).toEqual(['note1', 'note2', 'note3']);
    });
  });

  describe('::getUUID()', () => {
    it('gets a UUID', () => {
      expect(notesService.getUUID()).toEqual(jasmine.any(String));
    });
  });
});
