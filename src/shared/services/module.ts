import * as angular from 'angular';
import {UserService} from './user';
import {LocalStorageService} from './local-storage';
import {NotesService} from './notes';

// bind common service classes into angular services
export default angular.module('app.shared.services', [])
  .service('LocalStorageService', LocalStorageService)
  .service('NotesService', NotesService)
  .service('UserService', UserService);
