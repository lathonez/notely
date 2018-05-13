describe('Component::overview', () => {

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
    component = $componentController('overview', locals, bindings);

    // trigger init on component, $componentController doesn't currently
    component.$onInit();
  }));

  describe('::constructor()', () => {
    it('should contain a logger', () => {
      expect(component.$log).toBeDefined()
    })
  })

});
