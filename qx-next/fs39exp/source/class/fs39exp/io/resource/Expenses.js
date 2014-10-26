"use strict";
/* ************************************************************************
Copyright:

License:

Authors:

************************************************************************ */

/**
 */
qx.Class.define("fs39exp.io.resource.Expenses",
{
 include : [qx.event.MEmitter],

 construct : function()
 {
   this._resource = new qx.io.rest.Resource(this._description)

   this._resource.configureRequest(function(req) {
    req.setRequestHeader("Content-Type", "application/json");
   });

  this._resource.on("success", this._onSuccess, this);
  this._resource.on("error", this._onError, this);
 },

 events :
 {
  "updateExpenses" : "Array",
  "error" : null
 },


 members :
 {
  _resource : null,

  _description :
  {
    "getExpenses":
    {
      method: "GET",
      url: "http://sukkram:5984/expenses/_design/{action}/_view/{buyer}"
    }
  },

  _onSuccess : function(evt)
  {
    if (evt.response) {
      var res = JSON.parse(evt.response);

      this.emit("update", res);
    }
  },

  _onError : function(evt)
  {
    this.emit("error");
  },

  requestExpenses : function(action, buyer)
  {
   return this._resource.getExpenses({
    action : action,
    buyer : buyer
   });
  }

 }
});