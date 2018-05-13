import './overview.scss';
import { Injectable, IComponentOptions, IControllerConstructor, IController } from 'angular';
import {Note, NotesService} from '../shared/services/notes';

export class OverviewComponent implements IComponentOptions {
  public controller: Injectable<IControllerConstructor> = OverviewController;
  public template: string = require('./overview.html').toString();
}

/**
 * Provides an overview of all notes in the system and allows users to navigate down to add a note
 */
export class OverviewController implements IController {

  // dependency injection
  public static $inject: Array<string> = ['$log', 'NotesService'];

  public pageTitle: string = 'Notes Overview';

  // notes displayed in the overview table
  public notes: Array<Note> = [];

  // vendor services
  public $log: any;

  // notely services
  public notesService: NotesService;

  /**
   * @param {*} $log Angular Log Service
   * @param notesService
   */
  constructor($log: any, notesService: NotesService) {
    this.$log = $log.getInstance('Overview');
    this.$log.debug('constructor');
    this.notesService = notesService;
  }

  /**
   * life cycle hook
   */
  public $onInit(): void {
    this.$log.debug('onInit');

    // load all notes in from the service
    this.notes = this.notesService.getAll();
  }
}
