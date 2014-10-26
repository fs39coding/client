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

  construct : function()
  {
    this.super(qx.ui.mobile.page.NavigationPage, "constructor");
    this.title = "WG-Kasse";
    this.backButtonText = "Back";
    this.model = new qx.data.Array(
      [
        {"_id":"1a71ec7788428a28c58437cd67003004","_rev":"1-4b913d554c3792c16b893faf26123b1d","timestamp":"2014-09-30T15:55:42.529Z","buyer":"Gabriel","items":["DUMMY Schwammt\u00fccher"],"amount":0.69,"isCleared":false},
        {"_id":"1a71ec7788428a28c58437cd6700358e","_rev":"1-ce905678576c9882eb03f449f5195523","timestamp":"2014-09-23T18:00:00.529Z","buyer":"Andreas","items":["DUMMY Dosen\u00f6ffner","DUMMY Pfannenwender"],"amount":6.78,"isCleared":false},
        {"_id":"1a71ec7788428a28c58437cd67003bf4","_rev":"1-e4149067ce9278446ecbe0ac3102b896","timestamp":"2014-09-20T15:55:42.529Z","buyer":"Gabriel","items":["DUMMY Sp\u00fclschw\u00e4mme"],"amount":0.99,"isCleared":false},
        {"_id":"1a71ec7788428a28c58437cd67003e7e","_rev":"1-a35e6539b50f3d5c780543057ea26d8b","timestamp":"2014-10-18T10:00:00.000Z","buyer":"Andreas","items":["DUMMY Schwammt\u00fccher"],"amount":0.69,"isCleared":false}
      ]);
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
      this._list.model = this.model;
      this.getContent().append(this._list);

    }
  }
});

