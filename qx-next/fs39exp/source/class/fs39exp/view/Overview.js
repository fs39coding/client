/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 */
qx.Class.define("fs39exp.view.Overview",
{
  extend : qx.ui.mobile.page.NavigationPage,


  construct : function(model)
  {
    this.super(qx.ui.mobile.page.NavigationPage, "constructor");
    this.title = "WG-Kasse";
    this.backButtonText = "Back";
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
    _list : null,

    // overridden
    _initialize : function()
    {
      this.super(qx.ui.mobile.page.NavigationPage, "_initialize");

      this._list = new fs39exp.ui.ExpList();
      qx.data.SingleValueBinding.bind(this.model, "allExpenses", this._list, "model");
      this.getContent().append(this._list);

    }
  }
});

