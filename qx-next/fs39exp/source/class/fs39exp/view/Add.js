/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 */
qx.Class.define("fs39exp.view.Add",
{
  extend : qx.ui.mobile.page.NavigationPage,

  construct : function(model)
  {
    this.super(qx.ui.mobile.page.NavigationPage, "constructor");
    this.title = "Neuer Einkauf";
    this.showBackButton = true;
    this.backButtonText = "Abbrechen";
    this.model = model;
  },

  properties :
  {
    model :
    {
      //check : "fs39exp.model.Expenses",
      init : null,
      nullable : true
    }
  },

  members :
  {
    _label : null,

    // overridden
    _initialize : function()
    {
      this.super(qx.ui.mobile.page.NavigationPage, "_initialize");
      this._label = new qx.ui.mobile.basic.Label("Test");
      this.getContent().append(this._label);
    },

    // overridden
    _back : function()
    {
      qx.core.Init.getApplication().getRouting().back();
    }
  }
});
