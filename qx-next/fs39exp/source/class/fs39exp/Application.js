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

      var overviewModel = new fs39exp.model.Overview() 
      var overview = new fs39exp.view.Overview(overviewModel);

      var addModel = new fs39exp.model.Add()
      var addView = new fs39exp.view.Add()

      // Add the pages to the page manager.
      var manager = new qx.ui.page.Manager(false);
      manager.addDetail([
        overview,
        addView
      ]);

      // Initialize the application routing
      this.getRouting().onGet("/", this._show, overview);
      this.getRouting().onGet("/add", this._show, addView);

      this.getRouting().init();

      var listResource = new fs39exp.io.resource.Expenses();
      
      var controller = new fs39exp.controller.Overview(listResource, overviewModel, overview);
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
