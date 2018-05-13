import './create-and-view.scss';
import { Injectable, IComponentOptions, IControllerConstructor, IController } from 'angular';
import {Note, NotesService} from '../shared/services/notes';
import {UserService} from '../shared/services/user';

export class CreateAndViewComponent implements IComponentOptions {

  public controller: Injectable<IControllerConstructor> = CreateAndViewController;
  public template: string = require('./create-and-view.html').toString();
}

/**
 * home - Controller
 *
 * @export
 * @class HomeController
 */
export class CreateAndViewController implements IController {

  // dependency injection
  public static $inject: Array<string> = ['$log', 'NotesService', 'UserService'];

  public pageTitle: string = 'Add a Note';

  // creating new notes
  public notesForm: any;
  public title: string;
  public note: string;

  // displaying the notes
  public notes: Array<Note> = [];

  // vendor services
  public $log: any;

  // notely services
  public notesService: NotesService;
  public userService: UserService;

  /**
   * @param {*} $log Angular Log Service
   * @param notesService
   * @param userService
   */
  constructor($log: any, notesService: NotesService, userService: UserService) {
    this.$log = $log.getInstance('CreateAndView');
    this.$log.debug('constructor');
    this.notesService = notesService;
    this.userService = userService;
  }

  /**
   * Submit a note for creation and push the newly created note into our working array
   */
  public submit(): void {
    this.notes.splice(0, 0, this.notesService.add(this.userService.getLoggedInEmail(), this.title, this.note));
    this.resetForm();
  }

  /**
   * life cycle hook
   */
  public $onInit(): void {
    this.$log.debug('onInit');
    this.notes = this.notesService.getAll();
  }

  //
  // Private Functions
  //

  /**
   * Should reset the local model and fall form fields
   */
  private resetForm(): void {
    this.title = '';
    this.note = '';
    this.notesForm.$setPristine();
    this.notesForm.$setUntouched();
  }
}
