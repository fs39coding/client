/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "fs39exp"
 *
 * @asset(fs39exp/*)
 */
qx.Class.define("fs39exp.Application",
{
  extend : qx.application.Mobile,


  members :
  {

    /**
     * This method contains the initial application code and gets called
     * during startup of the application
     */
    main : function()
    {
      // Call super class
      this.super(qx.application.Mobile, "main");

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console.
        // Trigger a "longtap" event on the navigation bar for opening it.
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
        Remove or edit the following code to create your application.
      -------------------------------------------------------------------------
      */

      var model = new fs39exp.model.Overview() 
      var view = new fs39exp.view.Overview(model);

      // Add the pages to the page manager.
      var manager = new qx.ui.mobile.page.Manager(false);
      manager.addDetail([
        view
      ]);

      // Initialize the application routing
      this.getRouting().onGet("/", this._show, view);

      this.getRouting().init();

      var resource = new fs39exp.io.resource.Expenses();
      
      var controller = new fs39exp.controller.Overview(resource, model, view);
    },


    /**
     * Default behaviour when a route matches. Displays the corresponding page on screen.
     * @param data {Map} the animation properties
     */
    _show : function(data) {
      this.show(data.customData);
    }
  }
});
