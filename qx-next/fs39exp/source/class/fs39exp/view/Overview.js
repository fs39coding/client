/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 */
qx.Class.define("fs39exp.view.Overview",
{
  extend : qx.ui.page.NavigationPage,


  construct : function(model)
  {
    this.super(qx.ui.page.NavigationPage, "constructor");
    this.title = "WG-Kasse";
    this.backButtonText = "Zurück";
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
    _addButton : null,

    // overridden
    _initialize : function()
    {
      this.super(qx.ui.page.NavigationPage, "_initialize");

      this._list = new fs39exp.ui.ExpList();
      qx.data.SingleValueBinding.bind(this.model, "allExpenses", this._list, "model");
      this.getContent().append(this._list);

      this._addButton = new qx.ui.Button("+");

      this._addButton.on("tap", this._onTapAdd, this);

      this.getRightContainer().append(this._addButton);
    },

    _onTapAdd : function(e) {
      qx.core.Init.getApplication().getRouting().executeGet("/add");
    }
  }
});

