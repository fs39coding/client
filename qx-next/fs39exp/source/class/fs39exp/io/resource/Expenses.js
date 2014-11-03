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
    },

    "postEntry":
    {
      method: "POST",
      url: "http://sukkram:5984/expenses/"
    }
  },

  _onSuccess : function(e)
  {
    if (e.action === "getExpenses") 
    {
      if (e.response) {
        var res = JSON.parse(e.response);

        this.emit("update", res);
      }   
    } 
    else if (e.action === "postEntry")
    {
      this.requestExpenses("filter", "All");
    } 
   
  },

  _onError : function(e)
  {
    this.emit("error");
  },

  requestExpenses : function(action, buyer)
  {
   return this._resource.getExpenses({
    action : action,
    buyer : buyer
   });
  },

  postEntry : function(buyer, items, amount, timestamp)
  {
    var obj = {
      buyer: buyer,
      items: items,
      amount: amount,
      timestamp : timestamp
    };

    return this._resource.postEntry(null, obj)
  }

 }
});