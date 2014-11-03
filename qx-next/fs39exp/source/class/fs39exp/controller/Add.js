/**
 */
qx.Class.define("fs39exp.controller.Add",
{
 construct : function(resource, model, view)
 {
  this.resource = resource;
  this.model = model;
  this.view = view;

  this._init()
 },

 properties :
 {
  model :
  {
    check : "fs39exp.model.Add",
    init : null,
    nullable : true
  },

  resource :
  {
    check : "fs39exp.io.resource.Expenses",
    init : null,
    nullable : true
  },

  view :
  {
    check : "fs39exp.view.Add",
    init : null,
    nullable : true
  }
 },

 members :
 {
  _init : function()
  {
    this.view.on("newEntry", function() {
      this.resource.postEntry(this.model.buyer, this.model.items, this.model.amount, this.model.timestamp);
    }, this);
  }
 }
});