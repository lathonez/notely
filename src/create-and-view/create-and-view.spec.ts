describe('Component::createAndView', () => {

  // component to run each test against
  let component: any;

  // load app module so we can access everything
  beforeEach(window.module('app'));

  // load app module so we can access everything
  beforeEach(inject(($rootScope, $componentController) => {

    // a scope is always required for a component to attach to
    let locals: any = {
      $scope: $rootScope.$new(),
    };

    // bindings data to compile component against
    let bindings: any = {};

    // generate component with angular.mocks helper service
    component = $componentController('createAndView', locals, bindings);

    // trigger init on component, $componentController doesn't currently
    component.$onInit();
  }));

  describe('::constructor()', () => {
    it('should contain a logger', () => {
      expect(component.$log).toBeDefined()
    })
  })

  describe('::submit', () => {
    it('submits', () => {
      spyOn(component.userService, 'getLoggedInEmail').and.returnValue('TEST-EMAIL');
      spyOn(component.notesService, 'add').and.returnValue('TEST-NOTE');
      component.notes = [];
      spyOn(component.notes, 'splice');
      spyOn(component, 'resetForm');
      component.title = 'TEST-TITLE';
      component.note = 'TEST-NOTE';
      component.submit();
      expect(component.notes.splice).toHaveBeenCalledWith(0, 0, 'TEST-NOTE');
      expect(component.notesService.add).toHaveBeenCalledWith(
        'TEST-EMAIL',
        'TEST-TITLE',
        'TEST-NOTE'
      );
    });
  });

  describe('::resetForm()', () => {
    it('resets the form', () => {
      component.title = 'TEST-TITLE';
      component.note = 'TEST-NOTE';
      component.notesForm = {
        $setPristine: (() => true),
        $setUntouched: (() => true)
      };
      spyOn(component.notesForm, '$setPristine');
      spyOn(component.notesForm, '$setUntouched');
      component.resetForm();
      expect(component.title).toEqual('');
      expect(component.note).toEqual('');
      expect(component.notesForm.$setPristine).toHaveBeenCalled();
      expect(component.notesForm.$setUntouched).toHaveBeenCalled();
    });
  });
});
