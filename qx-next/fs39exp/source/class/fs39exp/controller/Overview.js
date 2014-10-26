/**
 */
qx.Class.define("fs39exp.controller.Overview",
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
    check : "fs39exp.model.Overview",
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
    check : "fs39exp.view.Overview",
    init : null,
    nullable : true
  }
 },

 members :
 {
  _init : function()
  {
    this.resource.on("update", function(data){
        this.model.update(data);
      }, this);

    this.resource.requestExpenses("filter", "All");
  }
 }
});