/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 */
qx.Class.define("fs39exp.view.Add",
{
  include : [qx.event.MEmitter],

  extend : qx.ui.page.NavigationPage,

  construct : function(model)
  {
    this.super(qx.ui.page.NavigationPage, "constructor");
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
      this.super(qx.ui.page.NavigationPage, "_initialize");
      this._createForm();
    },

    _createForm : function()
    {
      var form = new qx.ui.form.Form().appendTo(this.getContent());

      var radio1 = new qx.ui.form.RadioButton();
      var radio2 = new qx.ui.form.RadioButton();
      var radiogroup = new qx.ui.form.RadioGroup(radio1, radio2);
      new qx.ui.form.Row(radio1, "Andreas")
        .appendTo(form);      
      new qx.ui.form.Row(radio2, "Gabriel")
        .appendTo(form);  

      var items = new qx.ui.form.TextField();
      items.required = true;
      new qx.ui.form.Row(items, "Artikel")
        .appendTo(form);

      var amount = new qx.ui.form.NumberField();
      amount.required = true;
      amount.minimum = 0;
      amount.maximum = 100;
      amount.step = 0.01;
      new qx.ui.form.Row(amount, "Betrag")
        .appendTo(form);

      // login button
      var button = new qx.ui.Button("Hinzufügen");
      this.getContent().append(button);

      button.on("tap", function() {
        if (form.validate()) 
        {
          var b = radio1.value ? "Andreas" : "Gabriel";
          var i = items.value.replace(/\s/g,'').split(","); //clear spaces and make an array
          var a = parseFloat(amount.value);

          this.model.update(b, i, a);
          this.emit("newEntry");
          this._back();
        }
      }, this);
    },

    // overridden
    _back : function()
    {
      qx.core.Init.getApplication().getRouting().back();
    }
  }
});
