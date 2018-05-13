import './note.scss';
import { Injectable, IComponentOptions, IControllerConstructor, IController } from 'angular';
import {Note, NotesService} from '../../services/notes';
import {User, UserService} from '../../services/user';

export class NoteComponent implements IComponentOptions {

  public controller: Injectable<IControllerConstructor> = NoteController;
  public template: string = require('./note.html').toString();
  public bindings: { [binding: string]: string; } = {
    note: '<'
  };
}

/**
 * home - Controller
 *
 * @export
 * @class HomeController
 */
export class NoteController implements IController {

  // dependency injection
  public static $inject: Array<string> = ['$log', 'NotesService', 'UserService'];

  public note: Note;
  public author: User;

  // vendor services
  private $log: any;

  // Notely services
  private user: UserService;

  /**
   *
   * @param $log
   * @param {NotesService} notesService
   * @param {UserService} user
   */
  constructor($log: any, notesService: NotesService, user: UserService) {
    this.$log = $log.getInstance('Note');
    this.$log.debug('constructor');
    this.user = user;
  }

  /**
   * life cycle hook
   */
  public $onInit(): void {
    this.$log.debug('onInit');

    this.author = this.user.get(this.note.author);
    console.log(this.author);
  }
}
