import Ember from 'ember';
import UnauthenticatedRouteMixin from
  'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  auth: Ember.inject.service(),
  session: Ember.inject.service(),

  model(/* params */) {
    return this.store.createRecord('user');
  },

  actions: {
    login(user) {
      // get the user from routes model
      this.get('auth')
        .loginOAuth2PasswordGrant(user)
        .then((result) => {
          // set errors to any that may have been returned
          this.set('controller.errorMessageKeys', result);
        });
      // 🤞

      // prevent form POST
      return false;
    },

    loginTwitter() {
      this.get('session').authenticate('authenticator:torii', 'twitter').then((/* data */) => {
        console.log('User sucessfully authenticated with Twitter.');
      }, (/* error */) => {
        this.set('controller.errorMessageKeys', ['errors.login.other']);
        debugger;
      }).catch((error) => {
        console.warn(error.message);
        debugger;
      });
    },

    signup() {
      this.get('currentModel').save()
        .then(() => {
          // user saved, invoke the login method
          this.send('login');
        }).catch((response) => {
          // deal with errors
          const { errors } = response;
          // map list of potential errors to error keys
          const errorMessageKeys = errors.mapBy('detail')
            .map(errorMessage => `errors.login.${errorMessage.dasherize()}`);
          // set error message list to the controller
          if (errorMessageKeys.length > 0) {
            this.set('controller.errorMessageKeys', errorMessageKeys);
          }
        });
      // 🤞
      return false; // prevent form POST
    },
  },
});
