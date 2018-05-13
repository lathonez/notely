import {LocalStorageService} from './local-storage';

export declare interface Note {
  author: string;
  title: string;
  note: string;
  date: Date;
}

export class NotesService {
  public static $inject: Array<string> = ['$log', 'LocalStorageService'];

  public static LOCAL_STORAGE_NAMESPACE: string = 'notely-notes';

  public $log: any;
  public storage: LocalStorageService;

  /**
   * Service concerned with Users
   *
   * @param $log
   * @param $cookies
   * @param {LocalStorageService} storage
   */
  constructor($log: any, storage: LocalStorageService) {
    this.$log = $log;
    this.storage = storage;
  }

  /**
   * Add a note to storage
   *
   * @param {string} email
   * @param {string} title
   * @param {string} body
   * @returns {Note}
   */
  public add(email: string, title: string, body: string): Note {

    let uuid: string = this.getUUID();

    let note: Note = {
      author: email,
      title: title,
      note: body,
      date: new Date(),
    };

    this.storage.set(NotesService.LOCAL_STORAGE_NAMESPACE, uuid, note);

    return this.storage.get(NotesService.LOCAL_STORAGE_NAMESPACE, uuid);
  }

  /**
   * Get all notes from storage
   *
   * @returns {Array<Note>}
   */
  public getAll(): Array<Note> {
    return this.storage.getAll(NotesService.LOCAL_STORAGE_NAMESPACE);
  }

  //
  // private functions
  //

  /**
   * Generate an ID to use when storing a note - this is way overkill for what we're doing, ideally it's just a serial
   * @returns {string}
   */
  private getUUID(): string {

    // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript (not a real GUID)
    let s4: Function = (() => {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    });

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}
