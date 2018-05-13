describe('Component::register', () => {

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
    component = $componentController('register', locals, bindings);

    // trigger init on component, $componentController doesn't currently
    component.$onInit();
  }));

  describe('::constructor()', () => {
    it('should contain a logger', () => {
      expect(component.$log).toBeDefined()
    })
  });

  describe('::submit()', () => {
    it('submits', () => {
      spyOn(component, 'validatePassword').and.returnValue('');
      spyOn(component.user, 'add');
      component.name = 'TEST-NAME';
      component.email = 'TEST-EMAIL';
      component.password = 'TEST-PASSWORD';
      component.passwordConf = 'TEST-PASSWORD-CONF';
      component.submit();
      expect(component.validatePassword).toHaveBeenCalledWith('TEST-PASSWORD', 'TEST-PASSWORD-CONF');
      expect(component.user.add).toHaveBeenCalledWith({name: 'TEST-NAME', email: 'TEST-EMAIL', password: 'TEST-PASSWORD'})
    });

    it('does not submit on password validation failure', () => {
      spyOn(component, 'validatePassword').and.returnValue('BAD-PASSWORD');
      spyOn(component.user, 'add');
      component.password = 'TEST-PASSWORD';
      component.passwordConf = 'TEST-PASSWORD-CONF';
      component.submit();
      expect(component.validatePassword).toHaveBeenCalledWith('TEST-PASSWORD', 'TEST-PASSWORD-CONF');
      expect(component.user.add).not.toHaveBeenCalled();
      expect(component.error).toEqual('BAD-PASSWORD');

    });

    it('catches an error from user.add', () => {
      spyOn(component, 'validatePassword').and.returnValue('');
      spyOn(component.user, 'add').and.throwError('SOMETHING BAD HAPPENED');
      spyOn(component, 'errorHandler').and.returnValue('ERROR-HANDLED');
      component.name = 'TEST-NAME';
      component.email = 'TEST-EMAIL';
      component.password = 'TEST-PASSWORD';
      component.passwordConf = 'TEST-PASSWORD-CONF';
      component.submit();
      expect(component.validatePassword).toHaveBeenCalledWith('TEST-PASSWORD', 'TEST-PASSWORD-CONF');
      expect(component.user.add).toHaveBeenCalledWith({name: 'TEST-NAME', email: 'TEST-EMAIL', password: 'TEST-PASSWORD'})
      expect(component.errorHandler).toHaveBeenCalled();
      expect(component.error).toEqual('ERROR-HANDLED');
    });
  });

  describe('errorHandler', () => {
    it('handles an error', () => {
      expect(component.errorHandler('EMAIL EXISTS')).toEqual('A user with that email address already exists');
    });

    it('handles a default error', () => {
      expect(component.errorHandler('SOMETHING ELSE')).toEqual('An unexpected error has occurred signing you up!');
    });
  });

  describe('validatePassword', () => {
    it('validates password (mismatch)', () => {
      expect(component.validatePassword('1', '2')).toEqual('the passwords you have entered do not match');
    });

    it('validates password (length)', () => {
      expect(component.validatePassword('1', '1')).toEqual(`please enter at least 8 digits for your password`);
    });

    it('validates password (pass)', () => {
      expect(component.validatePassword('password', 'password')).toEqual('');
    });
  })
});
