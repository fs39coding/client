/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 */
qx.Class.define("fs39exp.page.Overview",
{
  extend : qx.ui.mobile.page.NavigationPage,

  construct : function()
  {
    this.super(qx.ui.mobile.page.NavigationPage, "constructor");
    this.title = "Overview";
    this.showBackButton = true;
    this.backButtonText = "Back";
  },


  members :
  {
    // overridden
    _initialize : function()
    {
      this.super(qx.ui.mobile.page.NavigationPage, "_initialize");

      this.getContent().append(new qx.ui.mobile.basic.Label("Your first app."));
    },


    // overridden
    _back : function()
    {
      qx.core.Init.getApplication().getRouting().back();
    }
  }
});
