/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 */
qx.Class.define("fs39exp.page.Login",
{
  extend : qx.ui.mobile.page.NavigationPage,

  construct : function()
  {
    this.super(qx.ui.mobile.page.NavigationPage, "constructor");
    this.title = "Login";
  },


  members :
  {
    __form: null,


    // overridden
    _initialize: function() {
      this.super(qx.ui.mobile.page.NavigationPage, "_initialize");

      // Username
      var user = new qx.ui.mobile.form.TextField();
      user.required = true;

      // Password
      var pwd = new qx.ui.mobile.form.PasswordField();
      pwd.required = true;

      // Login Button
      var loginButton = new qx.ui.mobile.Button("Login");
      loginButton.on("tap", this._onButtonTap, this);

      var loginForm = this.__form = new qx.ui.mobile.form.Form();
      loginForm.add(user, "Username");
      loginForm.add(pwd, "Password");

      // Use form renderer
      this.getContent().append(new qx.ui.mobile.form.renderer.Single(loginForm));
      this.getContent().append(loginButton);
    },


    /**
     * Event handler for <code>tap</code> on the login button.
     */
    _onButtonTap: function() {
      // use form validation
      if (this.__form.validate()) {
        qx.core.Init.getApplication().getRouting().executeGet("/overview");
      }
    }
  }

});
