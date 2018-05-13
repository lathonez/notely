describe('Component::login', () => {

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
    component = $componentController('login', locals, bindings);

    // trigger init on component, $componentController doesn't currently
    component.$onInit();
  }));

  describe('::constructor()', () => {
    it('should contain a logger', () => {
      expect(component.$log).toBeDefined()
    })
  })

  describe('::submit()', () => {
    it('submits', () => {
      spyOn(component.user, 'login');
      component.email = 'TEST-EMAIL';
      component.password = 'TEST-PASSWORD';
      component.submit();
      expect(component.user.login).toHaveBeenCalledWith('TEST-EMAIL', 'TEST-PASSWORD');
    });

    it('catches an error submitting', () => {
      spyOn(component.user, 'login').and.throwError('BAD STUFF WENT ON');
      spyOn(component, 'errorHandler').and.returnValue('TEST ERROR');
      component.email = 'TEST-EMAIL';
      component.password = 'TEST-PASSWORD';
      component.submit();
      expect(component.user.login).toHaveBeenCalledWith('TEST-EMAIL', 'TEST-PASSWORD');
      expect(component.error).toEqual('TEST ERROR');
    });
  });

  describe('::handleError()', () => {
    it('handles invalid user or pass', () => {
      expect(component.errorHandler('INVALID USERNAME OR PASSWORD')).toEqual('Invalid username or password');
    });

    it('handles default', () => {
      expect(component.errorHandler('SOMETHING ELSE')).toEqual('An unexpected error has occurred while logging you in');
    });
  })
});
