import * as angular from 'angular';
import {HeaderComponent} from './header/header';
import {NoteComponent} from './note/note';

// bundle shared component classes into angular components
export default angular.module('app.components', [])
  .component('appHeader', new HeaderComponent())
  .component('note', new NoteComponent())


